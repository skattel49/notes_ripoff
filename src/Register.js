import React from 'react';
import { withRouter } from 'react-router';
export class RegisterComponent extends React.Component{
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
            if(data.hasOwnProperty("err")){
                console.error(data.err);
            }
            else{
                localStorage.setItem("token", data.token);
                this.props.history.push('/dashboard');
            }
            
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

export const Register = withRouter(RegisterComponent);