import React from 'react';

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
        fetch(`http://localhost:2000/items?id=${this.state.id}`, {
                method: 'get',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
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
        fetch('http://localhost:2000/items', {
            method: 'POST',
            credentials: 'include',
            headers:{
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                body: this.state.new_item,
                id: this.state.id
            })
        })
        .then(res => res.json())
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
