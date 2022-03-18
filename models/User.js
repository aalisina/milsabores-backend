const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = process.env.SALT_FACTOR || 10;

const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  address: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it is being modified or is new
  if (!user.isModified('password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_FACTOR, (errSalt, salt) => {
    if (errSalt) return next(errSalt);

    // hash the password
    return bcrypt.hash(user.password, salt, (errHash, hash) => {
      if (errHash) return next(errHash);

      // override the normal text password with the hashed password
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
