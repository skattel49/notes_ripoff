import React from 'react';

export class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {username:"", password: ""}
        this.handleClick = this.handleClick.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e){
        this.setState({username: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleClick(){
        fetch('http://localhost:2000/signup', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(data =>{
            localStorage.setItem("token", data.token);
        }).catch(err =>{
            console.log(err);
        });
    }
    render(){
        return (
            <div>
                <input type="text" placeholder="Choose a username" onChange={this.handleInputChange}/>
                <input type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
};