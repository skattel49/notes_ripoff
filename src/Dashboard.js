import React from 'react';
import {List} from './List';
import {Get, Post} from './requests';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {lists: [], newList: ""};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Get('/lists', `username=${localStorage.getItem('username')}`)
            .then(res => res.json())
            .then(user_data => {
                //fetch items of all the lists
                this.setState({lists: user_data[0].user_lists});
            })
            .catch(err => console.error(err));
    }

    handleClick(e){
        let req_body = {
            title: this.state.newList,
            username: localStorage.getItem("username")
        }
        
        Post('/lists/',req_body).then( res => res.json())
        .then(list_data => {
            //console.log(list_data)
            this.setState({lists: [...this.state.lists, list_data]});
            document.getElementById("_list").value = "";
        })
        .catch(err=> {
            console.error(err)
        });
    }

    handleChange(e){
        this.setState({newList: e.target.value});
    }

    render(){
        const allLists = [];
        let counter = 0;
        for(let list of this.state.lists){
            allLists.push(<List key={counter} title={list.title} id={list._id}/>);
            counter++;
        }
        return (
            <div>
                <h1>Welcome to your notes</h1>
                <ul>
                    {allLists}
                </ul>
                <input id="_list" type="text" placeholder="Create a new list" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
};