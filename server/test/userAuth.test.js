const userAuth = require('../app/middlewares/userAuth');
const User = require('../app/models/User');
const spotifyService = require('../app/services/spotifyService');
const axios = require('axios');

// Mock the spotifyService
jest.mock('../app/services/spotifyService', () => ({
  // Use the actual implementation but mock the needsTokenRefresh method
  ...jest.requireActual('../app/services/spotifyService'),
  // Always return true (expired) for testing purposes
  needsTokenRefresh: jest.fn().mockReturnValue(true), 
}));
//  Mock the User model
jest.mock('../app/models/User');
// Mock the axios module
jest.mock('axios');
// test suite for userAuth middleware
test('should attempt to refresh an "expired" token', async () => {
  // Setup mocks key value pairs for mock User and axios
  const mockUser = {
    // spotifyId is used in the Authorization header
    spotifyId: 'test_spotify_user_id',
    // accessToken and refreshToken are used for token refresh
    accessToken: 'old_token',
    refreshToken: 'refresh_token',
  //  save method is mocked to resolve successfully
    save: jest.fn().mockResolvedValue(true)
  };
  // Mock User.findOne to return the mock user
  User.findOne.mockResolvedValue(mockUser);
//  Mock Spotify Response
  const mockSpotifyResponse = {
    data: {
      // Simulated new access token and expiration time
      access_token: 'new_access_token',
      expires_in: 3600
    }
  };
  // Mock the axios post method to simulate token refresh
  axios.post.mockResolvedValue(mockSpotifyResponse);

  // Setup request/response - now using spotifyId in Bearer token
  const req = { headers: { authorization: 'Bearer test_spotify_user_id' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  // Run the middleware
  await userAuth(req, res, next);

  // Verify token refresh was attempted
  // Check if needsTokenRefresh was called with the mock user
  expect(spotifyService.needsTokenRefresh).toHaveBeenCalledWith(mockUser);
  // Check if axios.post was called with the correct URL and parameters
  expect(axios.post).toHaveBeenCalledWith(
    'https://accounts.spotify.com/api/token',
    // expect the request body to contain the refresh token
    expect.stringContaining('grant_type=refresh_token'),
    // expect any object for headers
    expect.any(Object)
  );
  // Expect the user's accessToken to be updated
  expect(mockUser.save).toHaveBeenCalled();
  // Expect next to be called to continue the request
  expect(next).toHaveBeenCalled();
});
