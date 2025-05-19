// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function TasksListcopy() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8080/tasks')
//       .then(response => {
//         setTasks(response.data.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Tasks List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Priority</th>
//             <th>Status</th>
//             <th>DueDate</th>
//           </tr>
//         </thead>
    
//         <tbody>
//           {tasks.map(t => (
//             <tr key={t.id}>
//               <td>{t.title}</td>
//               <td>{t.description}</td>
//               <td>{t.priority}</td>
//               <td>{t.status}</td>
//               <td>{t.due_date}</td>
              
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TasksListcopy;