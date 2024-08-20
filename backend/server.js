const express = require('express');
const cors = require('cors');
const { db } = require('./config/db.js')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.get("/api/:name", (req, res) => {
    res.json({
      message: `Hello ${req.params.name}, from server!`,
    });
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
  });


//   async function getPgVersion() {
//     const result = await db.raw("select version()");
//     console.log(result);
//   }
  
//   getPgVersion();