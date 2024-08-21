const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: './finalprojectstorage-433212-fa94be983253.json',
    projectId: 'finalprojectstorage-433212'
});

const bucketName = 'final-project-child-social-network';
const bucket = storage.bucket(bucketName);

  
  // Вызов функции для загрузки файла
//   uploadFile('finalprojectstorage-433212-fa94be983253.json', 'finalprojectstorage-433212-fa94be983253.json');

  module.exports = bucket;