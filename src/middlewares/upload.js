import sharp from 'sharp';
import multer from 'multer';

const createThumbnail = async (req, res, next) => {
  if (!req.file || !req.file.mimetype.startsWith('image/')) {
    next();
    return;
  }
  console.log(req.file.path);
  // TODO: use file path to create 160x160 png thumbnail with sharp
  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(`${req.file.path}_thumb`);
  } catch  {
    const newError = new Error('Failed to create thumbnail');
    newError.status = 400;
    next(newError);
    return;
  }
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
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

export {upload, createThumbnail};
