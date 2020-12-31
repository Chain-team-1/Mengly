
const mongoose = require('mongoose')

const ElephantSchema = mongoose.Schema({

    name : {
        type: String,
        required : true
    },
    species : {
        type: String,
        required : true
    },
    sex : {
        type: String,
        required : true
    },
    image : {
        type: String,
        required : true
    },
    wikilink : {
        type: String,
        required : true
    }


})
module.exports = mongoose.model('Elephant',ElephantSchema)