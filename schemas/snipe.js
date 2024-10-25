const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    Guild: String,
    Channel: String,
    Member: String,
    Username: String,
})

module.exports = mongoose.model("snipe", schema)