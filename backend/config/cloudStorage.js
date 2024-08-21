const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: './finalprojectstorage-433212-fa94be983253.json',
    projectId: 'finalprojectstorage-433212'
});

const bucketName = 'final-project-child-social-network';
const bucket = storage.bucket(bucketName);


  module.exports = bucket;