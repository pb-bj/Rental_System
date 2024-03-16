const multer = require('multer');
const fs = require('fs');
const pathname = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let destn = 'public/uploads';
          if(!fs.existsSync(destn)) { 
              fs.mkdirSync(destn, { recursive : true }) 
          }
    cb(null, destn) 
  },

    filename: function (req, file, cb) {
    let ext = pathname.extname(file.originalname) // extention for either jpg or png file
    let filename = pathname.basename(file.originalname, ext)

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let finalName = filename+uniqueSuffix+ext

    cb(null, finalName);
  }
});

const fileFilter = (req, file, next) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return next(new Error("Invalid file format"), false);
    }
    next(null, true);
};

const upload = multer({ // server storage
    storage : storage,
    fileFilter : fileFilter,
    limits : { 
        fileSize : 64000000     
    }
})

module.exports = upload;