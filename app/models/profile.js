const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
	{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    creditCard: {
      type: Number,
      required: true
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Tag',
      required: true
    },
    heldPiece1Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece'
    },
    heldPiece2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece'
    },
    cartedPiece1Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece'
    },
    cartedPiece2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Piece'
    },
    isSubscribed: {
      type: Boolean,
    }
  }
)

module.exports = mongoose.model('Profile', profileSchema)
