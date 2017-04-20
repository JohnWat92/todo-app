import React from 'react';

const ClearButton = ({removeCompleted}) => (
  <button onClick={removeCompleted}> Clear Completed </button>
)

export default ClearButton;