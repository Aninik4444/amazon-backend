const { addToCart } = require('../../../../controllers/v2/cart/addToCart');
jest.mock('../../../../models/Cart');
const Cart = require('../../../../models/Cart');
const { StatusCodes } = require('http-status-codes');

describe('login', () => {
let req, res;

beforeEach(() => {
  req = {
    body: {
      products: [{ productId: 'prod1', quantity: 1 }],
    },
    user: { userId: 'user123' },
  };

  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});
test('Test case 1: Should add product to cart when cart does not exist', async () => {
      const mockCart = {
      products: [],
      save: jest.fn(),
    };

    Cart.findOne = jest.fn().mockResolvedValue(null); // no existing cart
    Cart.create = jest.fn().mockResolvedValue(mockCart);

    await addToCart(req, res);
    expect(Cart.create).toHaveBeenCalledWith({ createdBy: 'user123' });
    expect(mockCart.products).toEqual(req.body.products);
    expect(mockCart.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ cart: mockCart });
  });
  test('Test Case 2:Should update quantity if product exists in cart', async () => {
    const userCart = {
      products: [
        { productId: 'product1', quantity: 2 }, 
      ],
      save: jest.fn().mockResolvedValue(),
    };

    Cart.findOne = jest.fn().mockResolvedValue(userCart);
    await addToCart(req, res);
    expect(userCart.products[0].quantity).toBe(2);
    expect(userCart.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ cart: userCart });
  });
  test('Test case 3: Should add product if it does not exist in cart', async () => {
  const userCart = {
    products: [], 
    save: jest.fn(),
  };
  Cart.findOne = jest.fn().mockResolvedValue(userCart);
  await addToCart(req, res);
  expect(userCart.products.length).toBe(1); // new product added
  expect(userCart.products[0]).toEqual(req.body.products[0]);
  expect(userCart.save).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(res.json).toHaveBeenCalledWith({ cart: userCart });
});

});