import cors from 'cors';
import express from 'express';
import router from './router';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 5555;

const mongoDb=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cszuj.mongodb.net/LibraryApp?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use('/', router);

mongoose.connect(mongoDb , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", (err)=>{console.error(err)});
db.once("open", () => {console.log("DB started successfully")});

app.listen(port, () => {console.log("Server started: 5555")});
