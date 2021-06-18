import React from 'react';
import { withRouter } from 'react-router';
import { Post } from './requests';
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
        let req_body = this.state;

        Post('/signup', req_body)
        .then(res => res.json()).then(data =>{
            if(data.hasOwnProperty("err")){
                console.error(data.err);
            }
            else{
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", this.state.username);
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