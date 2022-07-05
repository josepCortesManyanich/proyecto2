const { Schema, model, SchemaTypes } = require('mongoose');
 
const userSchema = new Schema(
  // Add whichever fields you need for your app
  {
    role: {
      type:String,
      default:'user'
    },
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.']
    },
    cart:{
      type: Schema.Types.ObjectId,
      ref: 'Cart'
    }
  },
  {
    timestamps: true
  }
);
 
const User = model('User', userSchema);

module.exports = User;