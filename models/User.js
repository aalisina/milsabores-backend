/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// eslint-disable-next-line radix
const SALT_WORK_FACTOR = parseInt(process.env.SALT_FACTOR) || 10;

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

  // only hash the password if it has been modified or is new
  if (!user.isModified('password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, function (errSalt, salt) {
    if (errSalt) return next(errSalt);

    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, function (errHash, hash) {
      if (errHash) return next(errHash);

      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
