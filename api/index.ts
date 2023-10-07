import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routes/users';
import expressWs from 'express-ws';

const app = express();
const port = 8000;

expressWs(app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);

(async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => console.log(`Server running at ${port} port...`));

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch((e) => console.error(e));
