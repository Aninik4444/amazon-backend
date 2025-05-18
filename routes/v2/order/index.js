const router = require('express').Router();
const { getOrders } = require('../../../controllers/Order');
const {addOrders} = require('../../../controllers/v2/orders/addOrders');
const {getOrder} = require('../../../controllers/v2/orders/getOrder');
const {updateOrder} = require('../../../controllers/v2/orders/updateOrder');


router.get('/:id', getOrder);
router.post('/', addOrders);
router.get('/', getOrders);
router.patch('/:id', updateOrder);

module.exports = router;
