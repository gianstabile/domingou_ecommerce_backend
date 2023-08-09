import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import multer from "multer";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función para elegir la carpeta según el tipo de archivo
function getDestination(req, file, cb) {
  const imageTypes = ["image/jpeg", "image/png", "image/gif"];
  const documentTypes = ["application/pdf", "application/msword", "text/plain"];

  if (file.fieldname === "profile" && imageTypes.includes(file.mimetype)) {
    cb(null, "profiles");
  } else if (file.fieldname === "thumbnails" && imageTypes.includes(file.mimetype)) {
    cb(null, "products");
  } else if (file.fieldname === "document" && documentTypes.includes(file.mimetype)) {
    cb(null, "documents");
  } else {
    cb(new Error("File type not allowed."));
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    getDestination(req, file, function (err, folder) {
      if (err) return cb(err);

      const destination = `${__dirname}/../public/uploads/${folder}`;
      fs.mkdir(destination, { recursive: true }, (err) => {
        if (err) return cb(err);
        cb(null, destination);
      });
    });
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });
export default __dirname;

// Bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const calculateExpirationDate = () => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  return expirationDate;
};

export const generateUniqueToken = () => {
  return uuid();
};
