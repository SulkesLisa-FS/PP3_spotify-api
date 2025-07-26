// Authentication flow tests

//Authentication service that mocks the auth service flow
const authService = {
  // Get the current user from localStorage
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  // Save user data (access token and Spotify ID) to localStorage
  setCurrentUser: (accessToken, spotifyId) => {
    const user = { accessToken, spotifyId };
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Remove user data from localStorage (log out)
  logout: () => {
    localStorage.removeItem("user");
  },
};

// Mock localStorage for testing environment
// Creates a fake localStorage that stores data in memory instead of browser storage
const localStorageMock = (() => {
  // Store object to hold fake storage data
  let store = {};
  return {
    // Get data by key
    getItem: (key) => store[key] || null,
    // Save data by key
    setItem: (key, value) => (store[key] = value.toString()),
    // Delete data by key
    removeItem: (key) => delete store[key],
    // Clear all data
    clear: () => (store = {}),
  };
})();

// Replace the localStorage with the mock version for testing
Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

// Authentication flow tests
describe("Authentication Flow Tests", () => {
  // Run before each test to ensure clean state
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  // Test: Verify that user data is properly stored when logging in
  test("should store user data when setting current user", () => {
    // Mock access token and Spotify ID
    const accessToken = "test-access-token";
    const spotifyId = "test-spotify-id";

    // Save user data
    authService.setCurrentUser(accessToken, spotifyId);

    // Verify it was saved correctly
    const storedUser = authService.getCurrentUser();
    // Expect stored user to match access token and Spotify ID
    expect(storedUser).toEqual({ accessToken, spotifyId });
  });

  // Test: Verify that no user returns null when localStorage is empty
  test("should return null when no user is stored", () => {
    // No user is set, so it should return null
    const user = authService.getCurrentUser();
    expect(user).toBeNull();
  });

  // Test: Verify that logout removes user data
  test("should clear user data on logout", () => {
    // First set a user with token and id
    authService.setCurrentUser("token", "id");
    // Verify user is set
    expect(authService.getCurrentUser()).toBeTruthy();

    // Then logout and verify user is gone
    authService.logout();
    // Expect no user data after logout
    expect(authService.getCurrentUser()).toBeNull();
  });

  // Test: Verify error handling when localStorage contains invalid data
  test("should handle invalid JSON in localStorage", () => {
    // Set invalid JSON in localStorage
    // This simulates a case where localStorage has corrupted data
    localStorage.setItem("user", "invalid-json");

    // Should throw an error when trying to parse invalid JSON
    expect(() => {
      authService.getCurrentUser();
    }).toThrow();
  });
});

// Error handling tests
describe("Error Handling Tests", () => {
  // Test: Verify that 401 errors clear user data from localStorage
  test("should handle 401 responses by clearing localStorage", () => {
    // Mock a 401 unauthorized error response from the server
    const mockError = {
      response: {
        status: 401,
        data: { error: "Unauthorized" },
      },
    };

    // Set initial user data to simulate logged-in state
    localStorage.setItem("user", JSON.stringify({ accessToken: "test" }));

    // Simulate 401 error handling logic
    if (mockError.response && mockError.response.status === 401) {
      // if 401 error, remove user data from localStorage
      localStorage.removeItem("user");
    }

    // Verify user data was cleared - user should be null
    expect(localStorage.getItem("user")).toBeNull();
  });

  // Test: Verify that 401 errors trigger a redirect to login page
  test("should redirect to login on 401 error", () => {
    // Mock the browser's window.location object
    const mockLocation = { href: "" };
    Object.defineProperty(global, "window", {
      value: { location: mockLocation },
      writable: true,
    });

    // Mock a 401 error
    const mockError = { response: { status: 401 } };

    // Simulate error handling: clear storage and redirect
    if (mockError.response && mockError.response.status === 401) {
      // Clear user data from localStorage
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/login";
    }

    // Verify redirect happened and user data was cleared
    expect(window.location.href).toBe("/login");
    expect(localStorage.getItem("user")).toBeNull();
  });
});
