import {model, Schema, Model, Document} from 'mongoose';

interface BookInterface extends Document {
  key: string;
  title: string;
  cover_i: number;
  author_name: Array<string>;
}

interface LibraryInterface extends Document {
  email: string;
  bookList: Array<BookInterface>;
}

const BookSchema: Schema = new Schema({
  key: {
    type: String,
    required: true,
    unique: false
  },
  title: {
    type: String,
    required: true,
    unique: false
  },
  author_name: {
    type: Array,
    required: true,
    unique: false
  },
  cover_i: {
    type: Number,
    required: false,
    unique: false
  }
})

const LibrarySchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bookList: {
    type: [BookSchema],
    required: false, 
    unique: false
  }
});

const LibraryModel: Model<LibraryInterface> = model('UserLibrary', LibrarySchema);

export default LibraryModel;
