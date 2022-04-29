import React from 'react'
import {Link} from 'react-router-dom'


const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>
                {todo.name}
            </td>
            <td>
                {todo.create_time}
            </td>
            <td>
                {todo.update_time}
            </td>
            <td>
                {todo.username}
            </td>
            <td>
                {todo.is_active ? 'Active' : 'N/active'}
            </td>
            <td>
                <button onClick={()=>deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
            <table>
                <th>
                    ToDo name
                </th>
                <th>
                    Create Time
                </th>
                <th>
                    Update Time
                </th>
                <th>
                    Username
                </th>
                <th>
                    Is_active
                </th>
                <th>
                    Delete
                </th>
                {todos.map((todo) => <ToDoItem todo={todo} deleteTodo={deleteToDo}/>)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default ToDoList