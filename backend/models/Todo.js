const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text:[ {
        type: String,
        required: true,
    }]
 
})
module.exports = mongoose.model("Todo", TodoSchema)