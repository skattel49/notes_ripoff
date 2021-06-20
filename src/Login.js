import React from 'react';
import { withRouter } from 'react-router';
import {Post} from './requests';
import './Login.css';

class LoginComponent extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    //handles changes in username
    handleInputChange(e){
        this.setState({username: e.target.value});
    }
    //handles changes in password field
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    //sends data to the backend and fetches token if the
    //credentials are valid
    handleClick(){
        let req_body = this.state;
        
        Post('/login', req_body).then(res => {
            return res.json();
        })
        .then(data => {
            if(data.hasOwnProperty('err')){
                console.error(data.err);
            }else{
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', this.state.username);
                this.props.history.push('/dashboard');
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        return (
            <div className="container-login">
                <div className="flex-login">
                    <input className="input-login" type="text" placeholder="Username" onChange={this.handleInputChange}/>
                    <input className="input-login" type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                    <button className="button-login" onClick={this.handleClick}>Login</button>
                </div>
            </div>
        );
    }
};

export const Login =  withRouter(LoginComponent);