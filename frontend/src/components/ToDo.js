import React from 'react'


const ToDoItem = ({todo}) => {
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
                {todo.is_active}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table>
            <th>
                ToDoname
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
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}

export default ToDoList