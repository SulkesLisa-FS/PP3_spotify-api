const userAuth = require('./userAuth');
const User = require('../models/User');
const spotifyService = require('../services/spotifyService');
const axios = require('axios');

// Mock the spotifyService
jest.mock('../../app/services/spotifyService', () => ({
  ...jest.requireActual('../../app/services/spotifyService'),
  refreshToken: jest.fn().mockReturnValue(true), // Always return true (expired)
}));

jest.mock('../../app/models/User');
jest.mock('axios');

test('should attempt to refresh an "expired" token', async () => {
  // Setup mocks
  const mockUser = {
    accessToken: 'old_token',
    refreshToken: 'refresh_token',
    save: jest.fn().mockResolvedValue(true)
  };
  
  User.findOne.mockResolvedValue(mockUser);
  
  const mockSpotifyResponse = {
    data: {
      access_token: 'new_access_token',
      expires_in: 3600
    }
  };
  axios.post.mockResolvedValue(mockSpotifyResponse);

  // Setup request/response
  const req = { headers: { authorization: 'Bearer old_token' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  // Run the middleware
  await userAuth(req, res, next);

  // Verify token refresh was attempted
  expect(spotifyService.refreshToken).toHaveBeenCalledWith(mockUser);
  expect(axios.post).toHaveBeenCalledWith(
    'https://accounts.spotify.com/api/token',
    expect.stringContaining('grant_type=refresh_token'),
    expect.any(Object)
  );
  expect(mockUser.save).toHaveBeenCalled();
  expect(next).toHaveBeenCalled();
});
