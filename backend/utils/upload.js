import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

export default function upload() {
  const mongodbUrl = `mongodb+srv://SefioDb:test123@sefiodb.c3ctilr.mongodb.net/?retryWrites=true&w=majority&appName=SefioDb`;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}