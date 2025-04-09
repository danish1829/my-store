const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'db8lqyrfu',
    api_key: '785832698846812',
    api_secret: '79ws_5ixdftxbnunh8HRY4iM_94',
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'clothify', 
        allowed_formats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = { cloudinary, storage };
