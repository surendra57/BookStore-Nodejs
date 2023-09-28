const mongoose = require('mongoose')

const ConnectDB = ()=>{
    mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database is connected on ${data.connection.host}`);
    });
  }

  module.exports= ConnectDB;