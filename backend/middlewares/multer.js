import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
}).fields([
  { name: "file", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);