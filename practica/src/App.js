import './App.css';
import Registro from './Components/Registro';
import Login from './Components/Login';
import Dashboard from './Components/Dashboad';
import React, {Component} from 'react';

class App extends Component {
  state = {
    register: false,
    logeado: false
  }
  constructor(props){
    super(props);
    this.handler = this.handler.bind(this);
    this.isLogged = this.isLogged.bind(this);
  }

  handler(){
    this.setState({ register: !this.state.register });
  }

  isLogged(){
    this.setState({ logeado: true });
  }

  render(){
    var mostrar;
    if(this.state.register) mostrar = <Registro handler={this.handler}/>;
    else mostrar = <Login handler={this.handler} isLogged={this.isLogged}/>;
    return (
    /* <div>
      {mostrar}
    </div> */
      <Dashboard/>
    );
  }
}

export default App;