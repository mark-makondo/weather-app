const mongoose = require('mongoose');

const ResultsSchema = mongoose.Schema(
  {
    app: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'scrapedapis',
    },
    methodUsed: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('results', ResultsSchema);
