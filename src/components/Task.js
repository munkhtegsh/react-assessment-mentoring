import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div>
      {
        props.completed
        ?
        <div>
        <Link to={`/detailedtask/${props.id}`}>
          <p style={{textDecorationLine: "line-through"}}>{props.title}</p>
        </Link>
        <button onClick={() => props.completeTask(props.id)} disabled>Complete</button>
        </div>
        :
        <div>
        <Link to={`/detailedtask/${props.id}`}>
          <p>{props.title}</p>
        </Link>
        <button onClick={() => props.completeTask(props.id)} >Complete</button>
        </div>
      }
      <button onClick={() => props.deleteTask(props.id)}>X</button>
    </div>
  )
}