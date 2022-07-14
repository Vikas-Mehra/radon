const aws = require("aws-sdk");

// Configurations Of AWS-S3 for Access.
aws.config.update({
  accessKeyId: "AKIAY3L35MCRVFM24Q7U",
  secretAccessKey: "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",
  region: "ap-south-1",
});

// This function will upload file to AWS and return the URL(link).
const uploadFile = async (file) => {
  try {
    // Promisify the Function.
    return new Promise(function (resolve, reject) {
      // We will be using the S3 Service of AWS.
      let s3 = new aws.S3({ apiVersion: "2006-03-01" });

      // Details about AWS-Object, which we are Uploading.
      var uploadParams = {
        ACL: "public-read",
        Bucket: "classroom-training-bucket", //HERE ~ Can Edit.
        Key: "Project-3/" + file.originalname, //HERE ~ Can Edit.
        Body: file.buffer,
      };

      // Upload File.
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          // If Promise State - Rejected.
          return reject({ error: err });
        }
        // Otherwise-If Promise State - Resolved.
        console.log(data); // Data of Uploaded-File.
        console.log("File Uploaded Succesfully.");

        return resolve(data.Location);
      });
    });
  } catch (error) {
    return res.status(100).send({ status: false, message: error.message });
  }
};

module.exports = { uploadFile };
