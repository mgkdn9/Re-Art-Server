const mongoose = require('mongoose')

const pieceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        isAssigned: {
            type: Boolean,
            allowNull: true,
        },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Tag',
            required: true,
        },
        isPurchased: {
            type: Boolean,
            allowNull: true,
        },
        price: {
            type: Number,
            allowNull: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Piece', pieceSchema)
