import express from 'express';
import expressWs from 'express-ws';
import Message from '../models/Message';
import authWs from '../middleware/auth.ws';
import { ActiveConnections, IMessage, IncomingMessage } from '../types';

const app = express();
const messagesRouter = express.Router();

expressWs(app);

const activeConnections: ActiveConnections = {};

messagesRouter.ws('/', (ws) => {
  const id = crypto.randomUUID();
  activeConnections[id] = ws;

  ws.on('close', () => {
    delete activeConnections[id];
  });

  ws.on('message', async (msg) => {
    const { type, payload } = JSON.parse(msg.toString()) as IncomingMessage;

    try {
      switch (type) {
        case 'LOGIN':
          void await authWs(payload);

          ws.send(JSON.stringify({
            type: 'LOGIN',
            payload: 'OK',
          }));
          break;
        case 'GET_MESSAGES':
          const messages = await Message.find()
            .sort({ datetime: 1 })
            .populate('user', 'username role displayName avatar')
            .limit(30);

          ws.send(JSON.stringify({
            type: 'GET_MESSAGES',
            payload: messages,
          }));
          break;
        case 'SET_MESSAGE':
          void await setMessage(JSON.parse(JSON.stringify(payload)) as IMessage);

          Object.keys(activeConnections).forEach(connId => {
            const conn = activeConnections[connId];
            conn.send(JSON.stringify({
              type: 'NEW_MESSAGE',
              payload: [payload],
            }));
          });
          break;
        default:
          ws.send(JSON.stringify({
            type: 'ERROR',
            payload: 'This type is not exist',
          }));
      }
    } catch (e) {
      if (e) {
        ws.send(JSON.stringify({
          type: 'ERROR',
          payload: JSON.parse(JSON.stringify(e.toString())),
        }));
      }
    }
  });
});

async function setMessage(message: IMessage) {
  const result = new Message({
    user: message.user,
    text: message.text,
    datetime: new Date().toISOString(),
  });

  await result.save();
  return result;
}

export default messagesRouter;