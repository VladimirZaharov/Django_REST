import React from 'react';
import { render } from "react-dom";
import {HashRouter, Route, Routes, Link} from 'react-router-dom'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import ProjectList from './components/Project.js';
import ToDoList from './components/ToDo.js';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                const next_page_users = response.data.next
                const previous_page_users = response.data.previous
                    this.setState(
                        {
                            'next_page_users': next_page_users,
                            'previous_page_users': previous_page_users,
                            'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                    this.setState(
                        {
                            'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                const next_page_todos = response.data.next
                const previous_page_todos = response.data.previous
                    this.setState(
                        {
                            'next_page_todos': next_page_todos,
                            'previous_page_todos': previous_page_todos,
                            'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Menu />
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDo list</Link>
                            </li>
                        </ul>
                    </nav>
                        <Routes>
                            <Route exact path='/users' element={<UserList users={this.state.users} /> }/>
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} /> }/>
                            <Route exact path='/todos' element={<ToDoList todos={this.state.todos} /> }/>
                        </Routes>
                </HashRouter>
                <Footer />
            </div>
        )
    }
}

export default App;
