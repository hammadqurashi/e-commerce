import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 150 * 1024 * 1024, // 150 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|svg|webp/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      // req.file = file;
      cb(null, true);
    } else {
      cb(
        new Error(
          "File type not allowed. Only JPG, JPEG, PNG, SVG and WEBP allowed!"
        ),
        false
      );
    }
  },
});
