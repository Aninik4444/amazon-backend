const CartRouter = require('express').Router();
const { getCart } = require('../../../controllers/v2/cart/getCart');
const { addToCart } = require('../../../controllers/v2/cart/addToCart');
// const {clearCart} = require('../../controllers/v2/cart/clearCart');
const { removeFromCart } = require('../../../controllers/v2/cart/removeFromCart');
const { changeQuantity } = require('../../../controllers/v2/cart/changeQuantity');

CartRouter.get('/', getCart);
CartRouter.post('/', addToCart);
// CartRouter.delete('/', clearCart);
CartRouter.delete('/:id', removeFromCart);
CartRouter.patch('/:id', changeQuantity);
module.exports = CartRouter;
