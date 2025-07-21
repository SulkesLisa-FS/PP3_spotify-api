const spotifyService = require("../app/services/spotifyService");
// describe the test suite for spotifyService
describe("spotifyService", () => {
  // Test expired token detection
  test("needsTokenRefresh should return true when token is expired", () => {
    // Create a user object with an expired token
    const expiredUser = {
      // tokenExpires is set to 1 second ago
      tokenExpires: new Date(Date.now() - 1000),
    };
    // Call the needsTokenRefresh function with the expired user
    const result = spotifyService.needsTokenRefresh(expiredUser);
    // Expect it to return true since the token is expired
    expect(result).toBe(true);
  });

  // Test valid token detection
  test("needsTokenRefresh should return false when token is still valid", () => {
    // Create a user object with a valid token
    const validUser = {
      // tokenExpires is set to 1 hour from now
      tokenExpires: new Date(Date.now() + 3600000),
    };
    // Call the needsTokenRefresh function with the valid user
    const result = spotifyService.needsTokenRefresh(validUser);
    // Expect it to return false since the token is still valid
    expect(result).toBe(false);
  });

  // Test missing expiration field
  test("needsTokenRefresh should return true when tokenExpires is missing", () => {
    // Create a user object without tokenExpires field
    const userWithoutExpiry = {
      // accessToken is set but no tokenExpires field
      accessToken: "some_token",
    };
    // Call the needsTokenRefresh function with the user without expiry
    const result = spotifyService.needsTokenRefresh(userWithoutExpiry);
    // Expect it to return true since there's no expiration set
    expect(result).toBe(true);
  });
});
