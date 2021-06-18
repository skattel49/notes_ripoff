import React from 'react';
import { Get, Post } from './requests';
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
    handleChange(e){
        this.setState({new_item: e.target.value});
    }

    handleClick(e){
        let req_body = {
            body: this.state.new_item,
            id: this.state.id
        };
        Post('/items', req_body).then(res => res.json())
        .then(item_data => {
            document.getElementById(`${this.state.id}`).value = "";
            this.setState({items: [...this.state.items, item_data]})
        })
        .catch(err => console.error(err));
    }

    render(){
        const list_of_items = [];
        let counter = 0;
        for(let item of this.state.items){
            list_of_items.push(<li key={counter}>{item.body}</li>);
            counter++;
        }
        return (
            <div>
                <h3>{this.state.title}</h3>
                <ul>
                    {list_of_items}
                </ul>
                <input id={this.state.id} type="text" placeholder="create a new item" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
}
