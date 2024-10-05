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
      origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://hamsters-net.onrender.com"], // "https://di-final-project-child-social-network-lz8d.onrender.com", 
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


//   const dns = require('dns');

// // Obtain discovery hostname from environment variable
// const discoveryHostname = process.env.RENDER_DISCOVERY_SERVICE; // https://di-final-project-child-social-network.onrender.com

// console.log('discoveryHostname =>', discoveryHostname);


// function fetchAndPrintIPs() {

//   // Perform DNS lookup
//   // all: true returns all IP addresses for the given hostname
//   // family: 4 returns IPv4 addresses
//   dns.lookup(discoveryHostname, { all: true, family: 4 }, (err, addresses) => {
//     if (err) {
//       console.error('Error resolving DNS:', err);
//       return;
//     }
//     // Map over results to extract just the IP addresses
//     const ips = addresses.map(a => a.address);
//     console.log(`IP addresses for ${discoveryHostname}: ${ips.join(', ')}`);
//   });
// };

// fetchAndPrintIPs();