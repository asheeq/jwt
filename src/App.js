import React, { Component} from 'react';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      login: false,
      store: null
    }
  }

  login() {
    fetch("http://127.0.01:8080/signin", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: this.state.username, 
        password: this.state.password
      })
    })
    .then((response) => {
      response.text()
      .then((text) =>  {
        console.log("result", text);
        localStorage.setItem('login', JSON.stringify({
          login: true,
          token: text
        }))
        if(text.length>0)
          this.setState({login: true})
      })
    })
  }

  render() {
    return(
      <div>
        <h1>Simple JWT token App</h1>
        {
          !this.state.login?
          <div>
            <input type="text" onChange={(event) => {this.setState({username: event.target.value})}} />
            <br></br>
            <input type="text" onChange={(event) => {this.setState({password: event.target.value})}} />
            <br></br>
            <button onClick={() => {this.login()}}>Login</button>
          </div>
          :
          <div>
            <h1>JWT authenticated.</h1>
          </div>
        }
      </div>
    );
  }
}

export default App;
