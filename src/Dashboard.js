import React from 'react';

export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {lists: [], items: [], newList: ""};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        fetch(`http://localhost:2000/lists?username=${localStorage.getItem("username")}`,{
            method: "GET",
            credentials: "same-origin",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json)
        .then(data => {
            if(!data.hasOwnProperty("lists")){
                return;
            }
            this.state.lists = data.lists;
            //after fetching all the lists
            //fetch all the items of the list
            for(let list of data.lists){
                fetch(`http://localhost:2000/items?id=${list._id}`,{
                    method: "GET",
                    credentials: "same-origin",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(res => res.json())
                .then(data => {
                    this.state.items.push(data.items);
                }).catch(err => console.log(err));
            }
        }).catch(err => console.error(err));
    }

    handleClick(e){
        fetch(`http://localhost:2000/lists/`, {
            method: "GET",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then( res => res.text())
        .then(data => console.log(data))
        .catch(err=> {
            console.log("hi");
            console.error(err)
        });
    }

    handleChange(e){
        this.setState({newList: e.target.value});
    }

    render(){
        console.log(this.state);
        const allLists = [];
        for(const [idx, value] of this.state.lists){
            allLists.push(<li key={idx}>{value}</li>);
        }
        return (
            <div>
                <h1>Welcome to your notes</h1>
                <ul>
                    {allLists}
                </ul>
                <input type="text" placeholder="Create a new list" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>+</button>
            </div>
        );
    }
};