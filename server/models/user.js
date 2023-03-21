import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    account: {
      name: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        minlength: 6,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
