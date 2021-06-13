import React from 'react';

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    //handles changes in username
    handleInputChange(e){

        console.log(e.target.value);
        this.setState({username: e.target.value});
    }
    //handles changes in password field
    handlePasswordChange(e){
        console.log(e.target.value);
        this.setState({password: e.target.value});
    }
    //sends data to the backend and fetches token if the
    //credentials are valid
    handleClick(){
        fetch('http://localhost:2000/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        return (
            <div>
                <input type="text" placeholder="Username" onChange={this.handleInputChange}/>
                <input type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
};