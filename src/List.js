import React from 'react';
import { Get, Post, Delete } from './requests';
import "./List.css";
export class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            items: [],
            title: this.props.title,
            new_item: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        Get('/items', `id=${this.state.id}`)
        .then(res => res.json())
        .then(list_data => {
            //console.log(list_data.list_items);
            this.setState({items: list_data.list_items});
            })
        .catch(err => console.error(err));
    }

    handleDelete(e){
        const removalIndex = parseInt(e.target.id);
        //remove it after actually deleting the items
        Delete('/items', {id: this.state.items[removalIndex]._id})
        .then(res => res.json())
        .then(data => {
            this.setState({
                items: [...this.state.items.slice(0, removalIndex), ...this.state.items.slice(removalIndex+1)]
            });
        })
        .catch(err=>console.error(err));
    }

    handleChange(e){
        this.setState({new_item: e.target.value});
    }

    handleClick(e){
        if(this.state.new_item === ""){
            return;
        }
        let req_body = {
            body: this.state.new_item,
            id: this.state.id
        };
        Post('/items', req_body).then(res => res.json())
        .then(item_data => {
            document.getElementById(`${this.state.id}`).value = "";
            this.setState({items: [...this.state.items, item_data], new_item: ""})
        })
        .catch(err => console.error(err));
    }

    render(){
        const list_of_items = [];
        let counter = 0;
        for(let item of this.state.items){
            list_of_items.push(
                <li className="li-list" key={"li"+item._id}>
                    <p className="p-list">{item.body}</p>
                    <button className="button-list-minus" id={counter} onClick={this.handleDelete}>-</button>
                </li>);
            counter++;
        }
        return (
            <div>
                <h3 className="h3-list">{this.state.title}</h3>
                <ul>
                    {list_of_items}
                </ul>
                <input id={this.state.id} type="text" placeholder="create a new item" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
}
