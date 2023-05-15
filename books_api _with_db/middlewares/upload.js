
// import 3rd party middleware for handling multipart/form-data like images/files
const multer = require('multer');

// import uiid--> for generating unique IDs
const uuid4 = require('uuid').v4;
// import path ---> for reading the path
const path = require('path');

// where to store files/images
const storage = multer.diskStorage({
    // set destination
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req,file, cb) =>{  // NOte: cb is a call back function
    // get extension of file like txt, doc, ppt, png, jpeg ,
    // here originalname means the name of file what the users upload or in his/her computer
    const ext = path.extname(file.originalname.toLowerCase())

    // set filename that store in the disk storage by uusing fieldname,  unique id from uuid4 and its extension
    // here, fieldname ==> means what developer use field name in UI design form
    cb(null, `${file.fieldname}${uuid4()}${ext}`)

    }
});

// allow only certain file extensions like png, jpg by filtering it
const fileFilter = (req, file, cb) => {

    // get file extension
    const ext = path.extname(file.originalname.toLowerCase());

    // it the file extension is not jpg, jpeg, png
    if(!ext.match(/png|jpeg|jpg/)){
       return cb(new Error('only jpg, jpeg and png files are supported.'), false);
    }
    cb(null, true);
};

// upload function
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 2 * 1024 * 1024}  // NOte: file size must be 2MB
});

module.exports = upload;