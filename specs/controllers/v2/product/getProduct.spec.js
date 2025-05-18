const { getProduct } = require('../../../../controllers/v2/product/getProduct');
jest.mock('../../../../models/Product');
const Product = require('../../../../models/Product');
const { StatusCodes } = require('http-status-codes');

describe('getProduct', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: 'test-id' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test('Test case 1: Should test positive flow for get product', async () => {
    const mockProduct = { name: 'Test Product' };
    Product.findById.mockResolvedValue(mockProduct);
    await getProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockProduct);
  });
  
    test('Test case 2: Should test negative flow when product is not found', async () => {
        Product.findById.mockResolvedValue(null);
        try {
            await getProduct(req, res)
        } catch (error) {
            expect(error.message).toEqual('Product not found');
        }
    });
});
