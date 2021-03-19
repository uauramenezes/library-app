import {model, Schema, Model, Document} from 'mongoose';

interface AuthInterface extends Document {
  email: string;
  password: string;
}

const AuthSchema: Schema = new Schema({
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

const AuthModel: Model<AuthInterface> = model('User', AuthSchema);

export default AuthModel;
