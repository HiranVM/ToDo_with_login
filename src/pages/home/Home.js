import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToDo from '../../components/ToDo';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';

//backend 
const baseUrl = "http://localhost:5000";


const Home = () => {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  const user = useSelector((state) => state.auth.user);
console.log(user);
  const dispatch=useDispatch()
  const handleLogout = ()=>{
    dispatch(logout())
  }

  useEffect(() => {
    getAllToDo();
  }, []);


  const getAllToDo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todo/all/${user._id}`);
      setToDo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToDo = async () => {
    try {
      await axios.post(`${baseUrl}/todo/add`, { text,userId:user._id });
      setText("");
      await getAllToDo();
    } catch (error) {
      console.log(error);
    }
  };

  const updateToDo = async () => {
    try {
      await axios.post(`${baseUrl}/todo/update`, { id: toDoId, text,userId:user._id });
      setText("");
      setIsUpdating(false);
      await getAllToDo();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToDo = async (_id) => {
    try {
      await axios.post(`${baseUrl}/todo/delete`, { _id,userId:user._id });
      await getAllToDo();
    } catch (error) {
      console.log(error);
    }
  };

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
     <div className='name'>
      <h1>Welcome.. {user.username}</h1>
      </div>
      <div className='logout'>
      <button className='logout_btn' onClick={handleLogout}>Logout</button>
      </div>
      <div className="containers">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={isUpdating ? updateToDo : addToDo}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item,index) => (
            console.log(item,index),<ToDo
              key={index}
              text={item}
              updateMode={() => updateMode(index, item)}
              deleteToDo={() => deleteToDo(index)}
            />
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Home;
