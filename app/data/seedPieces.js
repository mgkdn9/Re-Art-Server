const Piece = require('../models/piece')
let mongoose = require('mongoose')
// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('../../config/db')
mongoose.connect(db)

const pieces = [
  new Piece({
    title: 'Toscano Angel of Patience',
    description: 'At more than a yard tall, this dramatic classic Angel Of Patience Statue is an investment in spiritual art sure to be the focal point of any home',
    artist: 'Unknown',
    isAssigned: false,
    tags: [
      '61be689f93fbb6c05981137b',//Light
      '61be689f93fbb6c059811380' //Statues
    ],
    isPurchased: false,
    price: 500,
    imgUrl: 'https://secure.img1-fg.wfcdn.com/im/87258276/compr-r85/3940/3940718/angel-of-patience-statue.jpg'
  }),
  new Piece({
    title: 'Toscano Angel of Patience',
    description: 'At more than a yard tall, this dramatic classic Angel Of Patience Statue is an investment in spiritual art sure to be the focal point of any home',
    artist: 'Unknown',
    isAssigned: false,
    tags: [
      '61be689f93fbb6c05981137b',//Light
      '61be689f93fbb6c059811380' //Statues
    ],
    isPurchased: false,
    price: 500,
    imgUrl: 'https://secure.img1-fg.wfcdn.com/im/87258276/compr-r85/3940/3940718/angel-of-patience-statue.jpg'
  }),
]

//Drop existing pieces
Piece.db.dropCollection('pieces', function(err, result){
  for( let i = 0; i < pieces.length; i++){
  // After we drop the pieces, we add them right back
  // Wouldn't be efficient at scale
    pieces[i].save()
  }
})