import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const API_URL = 'http://127.0.0.1:8080/tasks';

function TasksList() {
const [showForm, setShowForm] = useState(false);
const [tasks, setTasks] = useState([]);
const [form, setForm] = useState({ title: '', status: '' ,description:'',priority:'',});
const [editingId, setEditingId] = useState(null);
const [isFocussed, setIsFocussed] = useState(false);
const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log(" calling get all tasks")
    const res = await axios.get(API_URL);
    setTasks(res.data.data);
  };
  const handleFocus= async (e)=>{
    console.log("form focus active")
    setIsFocussed(!isFocussed)
    console.log("isFocussed" + !isFocussed)
  }
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    console.log("form data to be updated",    form)
    if (editingId) {
      console.log("id to be updated",editingId)
      console.log("form data to be updated",    form)
     await axios.put(API_URL,form,
      {
        params: { //query param 
        id: editingId
      }
    }
     )
    } else {
      await axios.post(API_URL,form);
    }
    setForm({ title: '', status: '' ,description: '',priority: ''});
    setEditingId(null);
    fetchTasks();
    setIsFocussed(!isFocussed)
  };
 
  const handleEdit = (task) => {
    setIsFocussed(!isFocussed)
    setForm({ title: task.title, status: task.status, description:task.description ,priority:task.priority});
    setEditingId(task.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}`,
      {
        params: {
        id: id
      }
    }
     )
    fetchTasks();}
  return (
    
     <div >

     <h1 >My To-do List</h1>
      <div className="taskFormClass" id={isFocussed ? "focusTrue" : "focusFalse"}>
      <form  onSubmit={handleSubmit}  >
        <input
          className="border p-2 mr-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Task title"
          maxLength={15}
          required
        />
        <input
          className="border p-2 mr-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          required
        />
        <select
          className="border p-2 mr-2"
          value={form.priority}
          required
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Set Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className="border p-2 mr-2"
          value={form.status}
          required
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Set Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        
        {/* <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText='Due Date'
        /> */}
        &nbsp;
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          {editingId ? 'Update' : 'Add'}
        </button>
        
      </form>
      </div>
      <br></br>
      <div className="center">

 
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            {/* <th>DueDate</th> */}
            <th className="actionCol">Actions</th>
          </tr>
        </thead>
    
        <tbody>
          {tasks.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td className='descClass'>{t.description}</td>
              <td>{t.priority}</td>
              <td>{t.status}</td>
              {/* <td>{t.due_date}</td> */}
              <td className='buttonClass'>
              <button onFocus={handleFocus} onClick={() => handleEdit(t)}  className='editButton' >Edit</button> 
             &nbsp; &nbsp; &nbsp;
              <button onClick={() => handleDelete(t.id)} className="deleteButton">Delete</button>
              </td>  
            </tr>
          ))}
        </tbody>
        </table>
                 </div>
    </div>
  );
  
}

export default TasksList;