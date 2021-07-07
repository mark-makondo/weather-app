const mongoose = require('mongoose');

const AutomationSchema = mongoose.Schema(
  {
    data: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('automations', AutomationSchema);
