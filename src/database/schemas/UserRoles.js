const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserRoleSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', require: true },
  role: { type: Schema.ObjectId, ref: 'Roles', require: true },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
}, { versionKey: false });

const UserRoles = mongoose.model('UserRoles', UserRoleSchema);

module.exports = UserRoles;
