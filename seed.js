import seeder from "mongoose-seed"
const db = require('./config/db')
// const serverDevPort = 8000
// const clientDevPort = 3000

seeder.connect(db, function () {
    seeder.loadModels([
        // '../models/piece'
        '../models/tag'
    ])
    seeder.clearModels(['tag'])
    seeder.populateModels(data, function (err, done) {
        if (err) {
            return console.log("seed err", err)
        }
        if (done) {
            return console.log("seed done", done)
        }
        seeder.disconnect()
    })
})

const data = [
    {
        'model': 'tag',
        'documents': [
            {
                "name": "Impressionistic"
            },
            {
                "name": "Pop"
            },
            {
                "name": "Abstract"
            }
                
        ]
    }
]
