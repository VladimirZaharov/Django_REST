import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {name: '', user: props.users[0]?.uid, note_text: ''}
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.name, this.state.user, this.state.note_text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="note_text">Note text</label>
                    <input type="text" className="form-control" name="note_text"
                    value={this.state.note_text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="user">User</label>
                    <select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map((item)=><option value={item.uid}>{item.username}</option>)} </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
            );
    }
}

export default ToDoForm