import multer from 'multer';
import fs from 'fs';
import path from 'path';
// let thumbnails = multer({ dest: 'uploads/thumbnails/' })
// let profilePic = multer({ dest: 'uploads/profilePic/' })
class MulterError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, MulterError.prototype);
    }
}
const checkIfDirExists = (filePath) => {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    return;
};
// Multer setup for thubmnail file upload
const thumbnailStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        checkIfDirExists('uploads/thumbnail/*');
        cb(null, 'uploads/thumbnail/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// Multer setup for dp file upload
const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        checkIfDirExists('uploads/profilePic/*');
        cb(null, 'uploads/profilePic/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const imageFileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept the file
    }
    else {
        const error = new MulterError('File must be an image.', 400);
        console.log(error);
        // cb(error, false); // Reject the file with an error
    }
};
const uploadThumbnail = multer({
    storage: thumbnailStorage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }
});
const uploadProfilePic = multer({
    storage: profilePicStorage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }
});
export default {
    uploadThumbnail,
    uploadProfilePic
};
//# sourceMappingURL=multer.js.map