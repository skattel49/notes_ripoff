/*
    A gentle reminder, never use indexes as keys in react,
    will give you a lot of trouble and unexpected bugs
*/
import React from 'react';
import {List} from './List';
import {Get, Post, Delete} from './requests';
import './Dashboard.css';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {lists: [], newList: ""};
        //binding this to event handlers
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(e){
        let removalIndex = parseInt(e.target.id);
        //now delete the list and all it's items
        //console.log([...this.state.lists.slice(0,removalIndex), ...this.state.lists.slice(removalIndex+1)]);
        Delete('/lists', {id: this.state.lists[removalIndex]._id})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState(
                {lists:
                    [...this.state.lists.slice(0,removalIndex), ...this.state.lists.slice(removalIndex+1)]
                }
            );
        })
        .catch(err => console.error(err));
        
    }

    handleClick(e){
        if(this.state.newList === ""){
            return;
        }
        let req_body = {
            title: this.state.newList,
            username: localStorage.getItem("username")
        }

        Post('/lists/',req_body).then( res => res.json())
        .then(list_data => {
            //console.log(list_data)
            this.setState({lists: [...this.state.lists, list_data], newList: ""});
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
            allLists.push(
            <li className="li-dashboard" key={"div_"+list._id}>
                <button className="button-dashboard-minus" id={counter} onClick={this.handleDelete}>-</button>
                <List title={list.title} id={list._id}/>
            </li>
            );
            counter++;
        }
        return (
            <div>
                <h1>Welcome to your notes {localStorage.getItem("username")}</h1>
                <ul className="flex-dashboard">
                    {allLists}
                </ul>
                <input className="input-dashboard" id="_list" type="text" placeholder="Create a new list" onChange={this.handleChange}/>
                <button className="button-dashboard-plus" onClick={this.handleClick}>+</button>
            </div>
        );
    }
};