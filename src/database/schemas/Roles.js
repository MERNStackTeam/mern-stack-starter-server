const mongoose = require('mongoose');

const { Schema } = mongoose;

const rolesSchema = new Schema({
  role: { type: String },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
}, { versionKey: false });

const Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;
