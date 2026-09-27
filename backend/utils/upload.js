const multer=require('multer');
const path =require('path');


// Multer storage cofuguration 

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads/')
  },
  filename:(req,file,cb)=>{
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null,`${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});


// File filter for images
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new Error('Not an image! Please upload images only.'), false);

    }
};
// Multer upload cofugrution 

const upload=multer({
    storage,
    fileFilter
});





module.exports=upload;

