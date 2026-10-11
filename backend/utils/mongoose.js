const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// Applied to every schema: expose `id`, hide internals and secrets, and make
// findByIdAndUpdate return the updated, validated document.
mongoose.plugin((schema) => {
  const transform = (_doc, ret) => {
    delete ret.__v;
    delete ret.password;
    return ret;
  };
  schema.set('toJSON', { virtuals: true, transform });
  schema.set('toObject', { virtuals: true, transform: (_doc, ret) => { delete ret.__v; return ret; } });
  schema.pre('findOneAndUpdate', function setUpdateOptions() {
    this.setOptions({ new: true, runValidators: true });
  });
});

module.exports = mongoose;
