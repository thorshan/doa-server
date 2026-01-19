import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: { 
      type: String, 
      required: [true, "Question text is required"],
      trim: true 
    },
    audioUrl: { 
      type: String, 
      default: "" 
    }, // For Listening (Choukai) questions
    imageUrl: { 
      type: String, 
      default: "" 
    }, // For Reading/Visual questions
    options: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.length >= 2; // Minimum 2 options, usually 4 for JLPT
        },
        message: "A question must have at least 2 options."
      },
      required: true
    },
    correctOptionIndex: { 
      type: Number, 
      required: [true, "You must specify the correct answer index"],
      min: 0
    },
    explanation: { 
      type: String, 
      trim: true 
    },
    level: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Level", 
      required: true 
    },
    category: { 
      type: String, 
      enum: ["Grammar", "Vocabulary", "Kanji", "Listening", "Reading"],
      required: true 
    },
    points: {
      type: Number,
      default: 1
    }
  },
  { 
    timestamps: true 
  }
);

// Indexing for faster filtering in the Question Bank
questionSchema.index({ level: 1, category: 1 });

const Question = mongoose.model("Question", questionSchema);
export default Question;