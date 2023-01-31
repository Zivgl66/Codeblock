const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose.connect(process.env.MONGO_CONNCETION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
});
