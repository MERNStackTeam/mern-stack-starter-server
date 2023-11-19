const fs = require('fs').promises; // Use the promises version of fs

const AWS = require('aws-sdk');

// Configure AWS SDK with your AWS credentials and region
const s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'us-east-1', // Replace with your desired AWS region
});

// Define your S3 bucket name
const bucketName = 'your-s3-bucket-name';

module.exports = {
  // Upload a file to S3
  async uploadFile(filePath, key) {
    const params = {
      Bucket: bucketName,
      Key: key, // The S3 object key (path) where the file will be stored

      Body: await fs.createReadStream(filePath), // Readable stream for your local file
    };

    try {
      const data = await s3.upload(params).promise();
      console.log(`File uploaded to S3 at ${data.Location}`);
      return data.Location;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  },

  // Delete a file from S3
  async deleteFile(key) {
    const params = {
      Bucket: bucketName,
      Key: key, // The S3 object key (path) to delete
    };

    try {
      await s3.deleteObject(params).promise();
      console.log(`File deleted from S3: ${key}`);
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw error;
    }
  },
};
