import mongoose from 'mongoose';

const renshuuASchema = new mongoose.Schema({
  patterns: [
    {
      structure: { type: String, required: true },
      meaning: { type: String, required: true }
    }
  ],
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: [true, 'Renshuu A must belong to a level']
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: [true, 'Renshuu A must belong to a chapter']
  },
  relatedKanji: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kanji'
  }],
  relatedVocab: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary'
  }]
}, {
  timestamps: true
});

const RenshuuA = mongoose.model('RenshuuA', renshuuASchema);

export default RenshuuA;