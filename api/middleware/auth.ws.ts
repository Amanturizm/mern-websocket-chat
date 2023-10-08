import User from '../models/User';

const authWs = async (token: string | undefined) => {
  if (!token) {
    throw new Error('No token!');
  }

  const user = await User.findOne({ token });

  if (!user) {
    throw new Error('Incorrect token!');
  }

  return user;
};

export default authWs;