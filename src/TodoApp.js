import React, { Component } from 'react';
import app from "./base";
import FlipMove from "react-flip-move";
import './TodoApp.css';
import BodyBackgroundColor from "react-body-backgroundcolor";

class TodoApp extends Component 
{
  state = { currentUser: null }
  componentDidMount() 
  {
      const { currentUser } = app.auth()
      this.setState({ currentUser })
  }

  constructor()
  {
    super();
    const { currentUser } = this.state
    var user = currentUser && currentUser.email
    if(localStorage.getItem(user)==null)
    {
      this.state = 
      {
        items: []
      };
    }
    else
    {
      this.state = 
      {
        items: JSON.parse(localStorage.getItem(user))
      };
    }
  }

  add()
  {
    const { currentUser } = this.state
    var user = currentUser && currentUser.email;
    var title = this.refs.title.value;
    if(localStorage.getItem(user) == null)
    {
      var items = [];
      items.push(title);
      localStorage.setItem(user, JSON.stringify(items));
    }
    else
    {
      var items = JSON.parse(localStorage.getItem(user));
      items.push(title);
      localStorage.setItem(user, JSON.stringify(items));
    }
    this.setState({
      items: JSON.parse(localStorage.getItem(user))
    });
  }

  delete(e)
  {
    const { currentUser } = this.state
    var user = currentUser && currentUser.email;
    var index = e.target.getAttribute('data-key');
    var list = JSON.parse(localStorage.getItem(user));
    list.splice(index, 1);
    this.setState({
      items: list
    });
    localStorage.setItem(user, JSON.stringify(list));
  }

  render()
  {
    const { currentUser } = this.state

    return(

      <BodyBackgroundColor backgroundColor='rgba(0, 0, 0, 0.7)'>

      <div class="Todo">

      <div class="profile">
        <button class="ppic" ></button>
      </div>


        <div class="heading">
          <p className="gdmrng">Good Morning! {currentUser && currentUser.email}!</p>
          <p class="your">Here's your ToDo List!</p>
        </div>

        <div className="adding">
          <input text_align="center" type = "text" placeholder = "What to do?" ref="title" size = "60"/>
          <br /><br /><br />
          <button class="classic" onClick={this.add.bind(this)} > Add a new task </button>
          <br/>
        </div>

        <div className="main_list">
          <ul align="center">
          <FlipMove duration={250} easing="ease-out">
          {
            this.state.items.map(function(work, index)
            {
              return(
                <div class="btn-group">
                  <button onClick={this.delete.bind(this)} data-key={index}> <li class="list_2"key = {index}>{work}<br/></li></button>
                </div>
              );
            }, this)
          }
          </FlipMove>
          </ul>
        </div>

        <div class="logout">
         <button onClick={() => app.auth().signOut()}>Log Out</button>
        </div>

      </div>

      </BodyBackgroundColor>
    );
  }
}

export default TodoApp;
