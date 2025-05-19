import React, { useState } from 'react';
import axios from 'axios';

function TaskForm() {
  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" maxLength={10} value={title}  onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={e => setDescription (e.target.value)} />
        </label>
        <label>
          Priority:
        <select value={priority} 
          onChange={e =>setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option> </select>
        </label>
        <label>
          Status:
          <select className="border p-2 mr-2" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
       
         {/* <input type="text" value={status} onChange={e => setStatus(e.target.value)} /> */}
        </label>
       <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TaskForm;