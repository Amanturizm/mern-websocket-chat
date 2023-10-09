import { model, Schema, Types } from 'mongoose';
import User from './User';

const MessageSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  text: {
    type: String,
    required: true,
  },
  datetime: Date,
});

const Message = model('Message', MessageSchema);

export default Message;