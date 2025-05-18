const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');
require('dotenv').config();
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });
  
  
  const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  };
  
  
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const isVideo = /mp4|mov|avi|mkv/.test(path.extname(file.originalname).toLowerCase());
        const folder = isVideo ? 'videos/' : 'images/';
        cb(null, folder + Date.now() + '-' + file.originalname);
      }
    }),
    fileFilter,
    limits: { fileSize: 600 * 1024 * 1024 } 
  });
  
  
module.exports = upload;