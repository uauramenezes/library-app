import {model, Schema, Model, Document} from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = model('User', UserSchema);

export default User;
