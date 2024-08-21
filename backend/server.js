const express = require('express');
const cors = require('cors');

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