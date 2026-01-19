import mongoose from 'mongoose';

const renshuuBSchema = new mongoose.Schema({
  exercises: [
    {
      questionRef: { 
        type: String, 
        required: false 
      },
      question: { 
        type: String, 
        required: true 
      },
      answer: [{ 
        type: String 
      }], 
      correctAnswer: { 
        type: String, 
        required: true 
      }
    }
  ],
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: [true, 'Renshuu B must belong to a level']
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: [true, 'Renshuu B must belong to a chapter']
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

const RenshuuB = mongoose.model('RenshuuB', renshuuBSchema);

export default RenshuuB;