import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../Form";
import API from "../../utils/API";
import io from 'socket.io-client'
import {ActiveChat} from "."
import './gameChat.css'
var moment =require("moment");

class Chatroom extends Component{

    state = {
        messages: [],
        newMessage: '',
        location: 'chatroom'
    }
    socket = null
    name = "Anonymous"
    id;

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value.substring(0,300)
        });
    };

    handleKeyDown = (event) => {
        switch (event.key) {
            case "Enter":
                this.handleFormSubmit()
                break;
            default: 
                break;
        }
    }
    

    handleFormSubmit = event => {
        if (this.state.newMessage) {
            const now = moment().format('h:mm:ssa')
            this.socket.emit('messagePost', this.state.newMessage, this.name, this.id, String(now))
        }
        this.setState({newMessage: ''})
    }

    handleTabClick = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleFavoriteClick = () => {
        console.log(this.props.gameId)
        API.favoriteGame(this.props.gameId).then((res) =>{
            console.log('worked, now check')
        })
    }


    componentDidMount(){
        this.connect(this.props.gameId);
    }


    componentWillReceiveProps(nextProps){
        this.setState({messages: []})
        this.connect(nextProps.gameId)
    }

    connect(gameId) {
        if (this.socket){
            this.socket.disconnect();
        }
        this.socket = io.connect("http://localhost:3001/game/" + gameId);
        API.authenticate().then((res) => {
            this.name = res.data.username;
            this.id = res.data.id
        });
        this.socket.on("messagePost", (msg, name, id) => {
            const _now = moment().format('hh:mm:ssa')
            this.setState({ messages: [...this.state.messages, {name: name, id: id, msg: msg, now:_now}] });
        });
    }
    render(){
      if(this.state.location === "chatroom"){
        return(
            <div className="chatroom">
                <div className="gametabs">
                    <button className="fas fa-star"
                    onClick={this.handleFavoriteClick}>
                    </button>
                    <button
                     className="details-tab"
                     name="location"
                     value="details"
                     onClick={this.handleTabClick}>
                     Details
                    </button>
                    <button
                    name="location"
                    value="chatroom" 
                    className="chatroom-tab"
                    onClick={this.handleTabClick}>
                    Chat
                    </button>
                </div>
                <div className="messagedisplay">
                    {this.state.messages.map((message, i) => (
                        (<div>
                            <p className={"px-3 my-1 py-1 chatroom-message"+ (i%2)}>
                            <div className="border-bottom mb-1">
                                <a href={"/user/"+message.id}><em>{message.name.substring(0,24)}</em></a>
                                <small id='time' className="float-right pt-1">{message.now}</small><br></br>
                            </div>
                            <span id='msg'>{message.msg.substring(0,250)}</span>
                            </p>
                        </div>) 
                    ))}
                </div>
                <div className = "messageandbutton">
                    <input
                        className = "currentmsg"
                        value={this.state.newMessage.substring(0,250)}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyDown}
                        name="newMessage"
                    />
                    <button
                        className = "msgbutton"
                        disabled={!(this.state.newMessage)}
                        onClick={this.handleFormSubmit}> 
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </div>
                </div> 
            )
        }
        else if(this.state.location === "details"){
            return(
                <div className="chatroom">
                    <div className="gametabs">
                        <button className="fas fa-star"></button>
                        <button
                         className="details-tab"
                         name="location"
                         value="details"
                         onClick={this.handleTabClick}>
                         Details
                        </button>
                        <button
                        name="location"
                        value="chatroom" 
                        className="chatroom-tab"
                        onClick={this.handleTabClick}>
                        Chat
                        </button>
                    </div>
                    <div className="detail-display">
                        <div className="game-details">
                            <p className="detail">Title: {this.props.gameInfo.name}</p>
                            <p className="detail">About: {this.props.gameInfo.description}</p>
                            <p className="detail">Created at: {moment(this.props.gameInfo.createdAt).format('MM/DD/YYYY')}</p>
                            <p className="detail">Created by: {this.props.gameInfo.username}</p>
                            <p className="detail">Score: {this.props.gameInfo.score}</p>
                        </div>
                    </div>
                    </div> 
                )
        }
    }
    
}
export default Chatroom;