const mongoose = require ("mongoose");

const todoSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true

    },
    completed:{
        type:Boolean,
        required:true,
        defualt:false,

    },
    createdAt:{
        type:Date,
        defualt:Date.now
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

const Todo = mongoose.model("Todo",todoSchema);
module.exports = Todo;