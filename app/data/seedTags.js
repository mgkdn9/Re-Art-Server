const Tag = require('../models/tag')
let mongoose = require('mongoose')
// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('../../config/db')
mongoose.connect(db)

const tags = [
  new Tag({
    name: 'Impressionist'
  }),
  new Tag({
    name: 'Pop'
  }),
  new Tag({
    name: 'Contemporary'
  })
]

//Drop existing tags
Tag.db.dropCollection('tags', function(err, result){
  // let count = 0 Don't need because we don't need to disconnect
  // After we drop the tags, we add them right back
  // Wouldn't be efficient at scale
  for( let i = 0; i < tags.length; i++){
    tags[i].save(function(err, result) {
      // count++
      // if( count === tags.length ){
      //   exit()
      // }
    })
  }
})

// function exit(){
//   mongoose.disconnect()
// }