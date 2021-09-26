import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  stripeId: string;
  password: string;
}

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  }
});

UserSchema.set('timestamps', true);

const User: Model<IUser> = model('User', UserSchema);

export default User;