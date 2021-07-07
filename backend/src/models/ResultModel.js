const mongoose = require('mongoose');

const ResultsSchema = mongoose.Schema(
  {
    app: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'scrapedapis',
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
