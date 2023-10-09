import express from 'express';
import expressWs from 'express-ws';
import Message from '../models/Message';
import authWs from '../middleware/auth.ws';
import { ActiveConnections, IMessage, IncomingMessage, IUser } from '../types';
import User from '../models/User';
import { HydratedDocument } from 'mongoose';

const app = express();
const messagesRouter = express.Router();

expressWs(app);

const activeConnections: ActiveConnections = {};

messagesRouter.ws('/:id', (ws, req) => {
  const id = req.params.id;
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
        case 'GET_USERS':
          const onlineUsers: HydratedDocument<IUser>[] = [];

          const promises = Object.keys(activeConnections).map(async (userId) => {
            const user = await User.findById(userId);
            if (user) {
              onlineUsers.push(user);
            }
          });

          await Promise.all(promises);

          ws.send(JSON.stringify({
            type: 'GET_USERS',
            payload: onlineUsers.map(user => ({
              _id: user._id,
              username: user.username,
              displayName: user.displayName,
              role: user.role,
              avatar: user.avatar,
            })),
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
          const message = JSON.parse(JSON.stringify(payload)) as IMessage;

          const user = await User.findById(message.user);

          if (!user) break;

          const datetime = new Date().toISOString();

          const newMessage = await setMessage(message, datetime);

          Object.keys(activeConnections).forEach(connId => {
            const conn = activeConnections[connId];
            conn.send(JSON.stringify({
              type: 'NEW_MESSAGE',
              payload: [{
                _id: newMessage._id,
                user: {
                  _id: user._id,
                  username: user.username,
                  displayName: user.displayName,
                  avatar: user.avatar,
                },
                text: newMessage.text,
                datetime,
              }],
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

async function setMessage(message: IMessage, datetime: string) {
  const result = new Message({
    user: message.user,
    text: message.text,
    datetime,
  });

  await result.save();
  return result;
}

export default messagesRouter;