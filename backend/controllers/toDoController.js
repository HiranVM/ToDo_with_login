const toDoController = require('express').Router()
const Todo = require('../models/Todo')

  //Add Todo
  toDoController.post('/add', async (req, res) => {
    const { text,userId } = req.body;
  
    try {
      const user = await Todo.findOne({ userId: userId });
  
      if (!user) {
        // If user doesn't exist, create a new one
        const newData = await Todo.create({ userId, text });
        console.log("Added Successfully...");
        console.log(newData);
        return res.status(201).json(newData)
      } else {
        // If user exists, update the 'text' array and save the user
        user.text.push(text);
        const updatedUser = await user.save();
        console.log("Added Successfully...");
        console.log(updatedUser);
        return res.status(201).json(updatedUser)
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err)
    }
  });

  //get Todolist
  toDoController.get('/all/:id', async (req, res) => {
    try {
      const userId = req.params.id
      const user = await Todo.findOne({userId:userId})
      const listItems = user.text.map((text) => text);
      res.status(200).json(listItems);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching todos' });
    }
  });
  
  //updte Todo
  toDoController.post('/update', async (req, res)=>{
    try{
      //find the item by its id and update it
     
      const {id,userId,text} = req.body;
      const updateItem = await Todo.findOne({userId:userId});
      updateItem.text[id]=text
      await updateItem.save()
      res.status(200).json(updateItem);
    }catch(err){
      res.json(err);
    }
  })
  
  
  //delete todo
  toDoController.post('/delete', async (req, res)=>{
    try{
      //find the item by its id and delete it
      const {id,userId} = req.body;
      const deleteItem = await Todo.findOne({userId:userId});
      deleteItem.text.splice(id,1)
      await deleteItem.save()
      res.status(200).json('Item Deleted');
    }catch(err){
      res.json(err);
    }
  })
  


module.exports = toDoController