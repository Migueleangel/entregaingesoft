import mongoose from 'mongoose';

export const startConnection = async () => {
  const url = encodeURI('mongodb+srv://miguelsotelo:fitnesvip1@cluster0.efkqoyw.mongodb.net/?retryWrites=true&w=majority');
  await mongoose.connect(url);
};

export default startConnection;
