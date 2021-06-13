import React from 'react';
import { withRouter } from 'react-router';

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
        fetch('http://localhost:2000/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.hasOwnProperty('err')){
                console.error(data.err);
            }else{
                localStorage.setItem('token', data.token);
                console.log(this.props);
                this.props.history.push('/dashboard');
            }
            
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

export const Login =  withRouter(LoginComponent);