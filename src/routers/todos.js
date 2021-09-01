const express = require("express");
const Todo = require("../models/todos");
const todoRouter = new express.Router();
const auth = require("../middleware/auth");


////////////// Post Todos
todoRouter.post('/todos',auth,async(req,res)=>{
   
    const todo = new Todo({...req.body,owner:req.user._id})
    try{
        await todo.save();
        res.status(200).send(todo);
    }
    catch(e){
        res.status(400).send(e);
    }
});


/////// Get All Todos
todoRouter.get('/todos',auth,async(req,res)=>{
    try{
       await req.user.populate('todos').execPopulate()
       res.send(req.user.todos)
    }
    catch(e){
        res.status(500).send(e)
    }
});

//////// Get By Id

todoRouter.get( '/todos/:id' ,auth,async(req,res)=>{
    const _id = req.params.id
    try{
        
        const todo = await Todo.findOne({_id,owner:req.user._id})
        if(!todo){
            return res.status(404).send("Todo not found")
        }
        res.status(200).send(todo)
    }
    catch(e){
        res.status(500).send(e)
    }
});


/////// update Todo
todoRouter.patch('/todos/:id',auth,async(req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    try{
     
        const todo = await Todo.findOne({_id,owner:req.user._id});
        if(!todo){
            return res.status(404).send("Todo is not found" );
        }
        updates.forEach((update)=> task[update] = req.body[update]);
        await todo.save();
        res.send(todo);
    }
    catch(e){
        res.status(400).send(e);
    }

});

/////// Delete Todo
todoRouter.delete('/todoss/:id',auth,async(req,res)=>{
    const _id = req.params.id;
    try{
        const todo = await Todo.findOneAndDelete({_id,owner:req.user._id})
        if(!todo){
            return res.status(404).send("Todo is not found");
        }
        res.send(todo)
    }
    catch(e){
        res.status(500).send(e)
    }
});


module.exports= todoRouter;



