const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: './finalprojectstorage-433212-fa94be983253.json',
    projectId: 'finalprojectstorage-433212'
});

const bucketName = 'final-project-child-social-network';
const bucket = storage.bucket(bucketName);


async function getBucketMetadata() {
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'final-project-child-social-network';

  // Get Bucket Metadata
  const [metadata] = await storage.bucket(bucketName).getMetadata();

  console.log(JSON.stringify(metadata, null, 2));
};


/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The origin for this CORS config to allow requests from
const origin = 'https://di-final-project-child-social-network-lz8d.onrender.com/';

// The response header to share across origins
const responseHeader = 'Content-Type';

// The maximum amount of time the browser can make requests before it must
// repeat preflighted requests
const maxAgeSeconds = 3600;

// The name of the method
// See the HttpMethod documentation for other HTTP methods available:
// https://cloud.google.com/appengine/docs/standard/java/javadoc/com/google/appengine/api/urlfetch/HTTPMethod
const method = 'GET';

async function configureBucketCors() {
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      maxAgeSeconds,
      method: [method],
      origin: [origin],
      responseHeader: [responseHeader],
    },
  ]);

  console.log(`Bucket ${bucketName} was updated with a CORS config
      to allow ${method} requests from ${origin} sharing 
      ${responseHeader} responses across origins`);
};


module.exports = {
  bucket,
  getBucketMetadata,
  configureBucketCors,
};