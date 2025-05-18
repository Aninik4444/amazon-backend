const { updateProduct } = require('../../../../controllers/v2/product/updateProduct');
jest.mock('../../../../models/Product');
const Product = require('../../../../models/Product');
const { StatusCodes } = require('http-status-codes');

describe('updateProduct', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: 'test-id' },
      body: { name: 'Updated Product' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });
  test('Test case 1: Should test positive flow for update product', async () => {
    const mockProduct = { name: 'Updated Product' };
    Product.findByIdAndUpdate.mockResolvedValue(mockProduct);
    await updateProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockProduct);
  });
  test('Test case 2: Should throw error when product is not found', async () => {
  Product.findByIdAndUpdate.mockResolvedValue(null);
   try {
            await updateProduct(req, res)
        } catch (error) {
            expect(error.message).toEqual('Product not found');
        }
    });
});
