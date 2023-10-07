import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

(async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => console.log(`Server running at ${port} port...`));

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch((e) => console.error(e));
