const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { getBucketMetadata, configureBucketCors } = require('./config/cloudStorage.js')
const cloudStorageUtils = require('./utils/cloudStorageUtils.js');

const usersRouter = require('./routes/usersRouter.js');
const postsRouter = require('./routes/postsRouter.js')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://di-final-project-child-social-network-lz8d.onrender.com"],
      exposedHeaders: ['x-access-token'],
    })
  );


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
  });


setTimeout(async() => {
  await cloudStorageUtils.updateSignedUrls();
}, 60 * 1000);


setInterval(async() => {
  await cloudStorageUtils.updateSignedUrls();
}, 24 * 60 * 60 * 1000);

// const printer = () => {
//   setInterval( () => console.log("printer =>"), 10 * 1000 );
// }

// printer();


app.use('/user', usersRouter);
app.use('/post', postsRouter);


// getBucketMetadata();
// configureBucketCors().catch(console.error);


//   async function uploadFile(filename, destination) {
//     await bucket.upload(filename, {
//       destination: destination,
//     });
  
//     console.log(`${filename} uploaded to ${bucket.name}`);
//   }

//   uploadFile('./finalprojectstorage-433212-fa94be983253.json', '123456.json');

// app.get("/api/:name", (req, res) => {
//     res.json({
//       message: `Hello ${req.params.name}, from server!`,
//     });
//   });  

// const { db } = require('./config/db.js')

//   async function getPgVersion() {
//     const result = await db.raw("select version()");
//     console.log(result);
//   }
  
//   getPgVersion();