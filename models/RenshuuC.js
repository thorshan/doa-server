import mongoose from 'mongoose';

const renshuuCSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  }, 
  scenario: { 
    type: String 
  },
  dialogue: [
    {
      speaker: { type: String, required: true }, 
      sentence: { type: String, required: true },
      meaning: { type: String }
    }
  ],
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  },
  relatedKanji: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kanji' }],
  relatedVocab: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }]
}, {
  timestamps: true
});

const RenshuuC = mongoose.model('RenshuuC', renshuuCSchema);
export default RenshuuC;