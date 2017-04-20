import React from 'react';

const ToDoItem = ({item, toggleComplete, removeToDo}) => (
  <li> 
    {item.title}
    <div>
      <input
        type="checkbox"
        id={item.id}
        checked={item.complete} 
        onChange={toggleComplete}
      />
      <label htmlFor={item.id}></label>
      <button onClick={removeToDo}>
        <i className="fa fa-trash"></i>
      </button>
    </div>
  </li>
);

export default ToDoItem;