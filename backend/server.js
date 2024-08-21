const express = require('express');
const cors = require('cors');
// const bucket = require('./config/cloudStorage.js')

const userRouter = require('./routes/userRouter.js');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://di-final-project-child-social-network-lz8d.onrender.com"],
    })
  );




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
  });


app.use('/user', userRouter);




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