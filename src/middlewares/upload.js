import sharp from 'sharp';
import multer from 'multer';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(
    'Tässä välissä älä tee muuta kuin tallenna thumbnail ja sitten next (async / await)'
  );
  console.log(req.file.path);
  // TODO: use file path to create 160x160 png thumbnail with sharp
  await sharp(req.file.path)
    .resize(160, 160)
    .png()
    .toFile(`uploads/thumbnail_${req.file.filename}`);

  next();
};


 // add multer import
 // multer configuration
 const upload = multer({
   dest: 'uploads/',
   limits: {
     fileSize: 10 * 1024 * 1024, // max 10 MB
   },
   fileFilter: (req, file, cb) => {
     // only allow images and videos
     if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
       cb(null, true);
     } else {
       const error = new Error('Only images and videos are allowed!');
       error.status = 400;
       cb(error, false);
     }
   },
 });

 export {upload, createThumbnail};
