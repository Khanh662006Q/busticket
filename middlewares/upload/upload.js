const multer = require('multer');
const mkdirp = require('mkdirp');

const uploadImage = (type) => {
   mkdirp.sync(`./public/avatars/${type}`);
   const storage = multer.diskStorage({
    
      destination: function (req, file, cb) {
         cb(null, `./public/avatars/${type}`);
      },
      filename: function (req, file, cb) {
         cb(null, Date.now() + '_' + file.originalname);
      },
   });
 
   const upload = multer({ storage: storage, 
      fileFilter: function (req, file, cb) {
      const filetypes = ['.png', 'jpg', '.jpeg'];
      const extension = file.originalname.slice(-4);
      const check =filetypes.includes(extension);
      if (check) {
         cb(null, true);
      } else {
         cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
   }});
   return upload.single('avatar');
}

module.exports = {
    uploadImage,
};