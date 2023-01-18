const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { limiter } = require("./utils/limiter");
const { requestLogger, errorLogger } = require("./utils/logger");
const serverErrorHandler = require("./middleware/servererror");
const { PORT, MONGO_DB } = require("./utils/config");
const router = require("./routes");

const app = express();
mongoose.connect(MONGO_DB);

app.use(limiter);
app.use(helmet());
const allowedCors = [
  'https://teresanews.students.nomoredomainssbs.ru',
  'http://teresanews.students.nomoredomainssbs.ru',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; 
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', "*");
  }

  next();
}); 
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(serverErrorHandler);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
