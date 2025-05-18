const router = require('express').Router();
const {addProducts} = require('../../../controllers/v2/product/addProducts');
const {getAllProducts} = require('../../../controllers/v2/product/getAllProducts');
const {getProduct} = require('../../../controllers/v2/product/getProduct');
const {updateProduct} = require('../../../controllers/v2/product/updateProduct');
const {deleteProduct} = require('../../../controllers/v2/product/deleteProduct');
const upload = require('../../../controllers/common/s3Utils');



// app.post('/upload', upload.single('file'), (req, res) => {
//     res.send('File uploaded to S3');
//   });

router.get('/', getAllProducts);
router.post('/',upload.single('media'), addProducts);
router.patch('/:id', updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
// app.post('/upload', upload.single('media'), (req, res) => {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
//     res.status(200).json({
//       message: 'File uploaded successfully!',
//       fileUrl: req.file.location
//     });
//   });
module.exports = router;
