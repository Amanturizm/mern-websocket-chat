import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routes/users';
import expressWs from 'express-ws';
import messagesRouter from './routes/messages';

const app = express();
const port = 8000;

expressWs(app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/chat', messagesRouter);

(async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => console.log(`Server running at ${port} port...`));

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch((e) => console.error(e));
