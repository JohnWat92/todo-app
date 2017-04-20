import React from 'react';

const ToDoCount = ({number}) => (
  <div>
    {number} {number=== 1 ? 'Task Left' : 'Tasks Left'} 
  </div>
);

export default ToDoCount;