const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPdfBuffer = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "MedySure/reports",
        public_id: publicId, // custom public_id
        format: "pdf",
        filename_override: publicId,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

module.exports = uploadPdfBuffer;
