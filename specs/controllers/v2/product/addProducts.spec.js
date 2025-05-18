const { addProducts } = require('../../../../controllers/v2/product/addProducts');
jest.mock('../../../../models/Product');
const Product = require('../../../../models/Product');
const { StatusCodes } = require('http-status-codes');

describe('add product test cases', () => {
    let req, res;
    beforeEach(() => {
        req = {
            body: {
                name: 'Test Product',
                price: 100,
                description: 'Test Description',
                category: 'Test Category',
                quantity: 10,
            },
            file: {
                location: 'https://example.com/image.jpg',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });
    test('Test case 1: Should test positive flow for add product', async () => {
        const mockProduct = [{ name: 'Test', imageURL: 'https://fake-s3-url.com/image.jpg' }];
        Product.insertMany.mockResolvedValue(mockProduct);
        await addProducts(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.send).toHaveBeenCalledWith(mockProduct);
    });
    test('Test case 2: Should test nagetive flow when file is not provided', async () => {
        req.file = null; // Simulate no file being provided
        await addProducts(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith(new Error('Please provide an image'));
    });
    test('Test case 3: Should test nagetive flow when product storing fails', async () => {
        const mockProduct = [{ error: 'name validation failed' }];
        Product.insertMany.mockRejectedValue(mockProduct);
        await addProducts(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith(mockProduct);
    });
    test('Test case 4: Should test nagetive flow when product stored with no product', async () => {
        const mockProduct = null;
        Product.insertMany.mockResolvedValue(mockProduct);
        await addProducts(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith(new Error('Something went wrong'));
    });
});