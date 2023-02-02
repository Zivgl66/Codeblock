const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose.connect(process.env.MONGO_CONNECTION_STRING , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
});
