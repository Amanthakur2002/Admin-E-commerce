const express = require('express');
const subcategory = express.Router();
// const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const aws = require("aws-sdk")
const multerS3 = require("multer-s3")
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

require("dotenv").config();
const cors = require('cors')

// const adminCategoryRouter = express.Router();

// adminCategoryRouter.use((req, res, next) => {
//   res.header('Access-Control-Allow-origin', '*');
//   next();
// })
// adminCategoryRouter.use(express.static('public'));
// adminCategoryRouter.use(cors());
// adminCategoryRouter.use(express.json())

const { subcategorylist,updatesubcategory,addsubcategory,addSubCat} = require('../../controller/subcategory/subcategory')
// const { version } = require("@hapi/joi/lib/common");

/*===================================================MULTER PART==========================================================*/

const BUCKET = process.env.bucketName
const s3 = new aws.S3({
  secretAccessKey: process.env.SecretKey,
  accessKeyId: process.env.AccessKey,
  region: process.env.region
});

const upload = multer({
  storage: multerS3({
    bucket: BUCKET,
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `picture-${Date.now()}-${file.originalname}`,);
    }
  })
});


subcategory.get('/subcategorylist',subcategorylist)
subcategory.put('/updatesubcategory',updatesubcategory)
subcategory.post('/addsubcategory',addsubcategory)
subcategory.post('/addSubCat', upload.single('subimg'), addSubCat)

module.exports = subcategory;