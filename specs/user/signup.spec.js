const { signup } = require('../../controllers/v2/user/signup'); // Import the signup function
const User = require('../../models/User'); // Import the User model
jest.mock('../../models/User'); // Mock the User model      
const { StatusCodes } = require('http-status-codes');


describe('signup', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'securePassword123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('Test case 1: Should test positive flow for signup', async () => {
    const mockUser = { name: 'Test User' };
    const mockQuery = {
        generateJWT: jest.fn().mockReturnValue(mockUser),
    }
    User.create.mockResolvedValue(mockQuery);
    await signup(req, res);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ token: mockUser }); 
  });
    test('Test case 2: Should test negative flow when user already exists', async () => {
        const mockUser = { name: 'Test User' };
        User.create.mockResolvedValue(mockUser);
        try {
            await signup(req, res);
        } catch (error) {
            expect(error.message).toEqual('User already exists');
        }
    });
});