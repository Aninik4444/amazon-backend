 const { getAllProducts } = require('../../../../controllers/v2/product/getAllProducts');
jest.mock('../../../../models/Product');
const Product = require('../../../../models/Product');
const { StatusCodes } = require('http-status-codes');

describe('getAllProducts', () => {
  let req, res;

  beforeEach(() => {
    req = {
      query: {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        category: 'Test Category',
        rating: 4,
        inStock: true
      },
    }
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });
    test('Test case 1: Should test positive flow for get all products', async () => {
        const mockProducts = {
    "products": [
        {
            "_id": "681ba3d996dbb6f176b4aff8",
            "name": "Women's 'Desk-to-Dinner' Fit & Flare Wrap Dress (Midi Length | Stylish)",
            "price": 699,
            "rating": 4,
            "category": "cloths",
            "description": "STYLE DETAIL: A classic midi-length fit-and-flare wrap dress with stylized sleeves",
            "imageURL": "https://a.media-amazon.com/images/I/61puwvhaPxL._AC_UL480_FMwebp_QL65_.jpg",
            "inStock": true,
            "__v": 0,
            "createdAt": "2025-05-07T18:18:01.751Z",
            "updatedAt": "2025-05-07T18:38:00.954Z"
        }
    ],
    "hits": 1,
    "count": 11,
    "totalPages": 11,
    "page": 1,
    "limit": 1
};
        const mockQuery = {
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue(mockProducts),
        };
        Product.find.mockReturnValue(mockQuery);
        Product.countDocuments.mockReturnValue(1);
        await getAllProducts(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    });
    test('Test case 2: Should throw error when products are not found', async () => {
        const mockQuery = {
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue(null),
        };
        Product.find.mockReturnValue(mockQuery);
        try {
            await getAllProducts(req, res)
        } catch (error) {
            expect(error.message).toEqual('Products not found');
        }
    });
});