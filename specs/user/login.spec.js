const { login } = require('../../controllers/v2/user/login'); // Import the login function
const User = require('../../models/User'); // Import the User model
jest.mock('../../models/User'); // Mock the User model
const { StatusCodes } = require('http-status-codes');

describe('login', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'securePassword123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
    test('Test case 1: Should return error for missing email or password', async () => {
        req.body.email = '';
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
    });
     test('Test case 2: Should return error for user not found', async () => {
    User.findOne.mockResolvedValue(null);
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
test('Test case 3: Should return error if password in incorrect', async () => {
  const mockUser = {
    comparePassword: jest.fn().mockResolvedValue(false), 
  };
  User.findOne.mockResolvedValue(mockUser);
  await login(req, res);
  expect(mockUser.comparePassword).toHaveBeenCalledWith(req.body.password);
  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
  expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
});
test('Test Case 4: Should log in successfully and return token', async () => {
  const fakeToken = 'abc12233jwt';

  const mockUser = {
    comparePassword: jest.fn().mockResolvedValue(true),
    generateJWT: jest.fn().mockReturnValue(fakeToken),
  };
  User.findOne.mockResolvedValue(mockUser);
  await login(req, res);
  expect(mockUser.comparePassword).toHaveBeenCalledWith(req.body.password);
  expect(mockUser.generateJWT).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ token: fakeToken });
});
});