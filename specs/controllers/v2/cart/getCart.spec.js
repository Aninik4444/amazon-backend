const { getCart } = require('../../../../controllers/v2/cart/getCart');
jest.mock('../../../../models/Cart');
const Cart = require('../../../../models/Cart');
const { StatusCodes } = require('http-status-codes');

describe('getCart', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { userId: 'user123' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  test('Test case 1: Should return user cart successfully', async () => {
    const mockCart = { products: [{ productId: 'product1', quantity: 2 }] };
    Cart.findOne.mockResolvedValue(mockCart);
    await getCart(req, res);
    // expect(Cart.findOne).toHaveBeenCalledWith({ createdBy: 'user123' });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ cart: mockCart });
  });
});