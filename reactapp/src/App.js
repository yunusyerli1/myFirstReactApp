import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import AddUser from './forms/AddUser';
import UpdateUser from './forms/UpdateUser';
import Users from './components/Users';
import Test from './components/Test';
import Contribute from './pages/Contribute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';  //Switch Not Found page'ler için yapılır
import NotFound from './pages/NotFound';
import './App.css';
import User from './components/User';


/*const Home = () => {
  return(
    <h3>Home Page</h3>
  )
}
const About = () => {
  return(
    <h3>About Page</h3>
  )
}
*/
class App extends Component {
  // state i context.js ye taşıdık
 /* state={
    users : [{
      id:1,
      name : 'Yunus Yerli',
      department : 'Bilişim',
      salary : '5500'
    },
    {
      id:2,
      name : 'Yusuf Güney',
      department : 'Eğlence',
      salary : '12000'
    },
    {
      id:3,
      name : 'Mehmet Hakan',
      department : 'Pazarlama',
      salary : '4500'
    }

    ]
  }*/
 /* deleteUser = (id) =>{
    this.setState({
      users : this.state.users.filter(user => id !== user.id)
    })
  }
*/

/*    <Test test = "deneme" />
      

      <hr/>
      <AddUser />

      <Users />
      */
  render(){
  return (
    <Router>
    <div className="container">
        <Navbar title="User App"/>
        <hr/>
        
        <Switch>
          <Route exact path = "/" component = {Users} />
          <Route exact path = "/add" component = {AddUser} />
          <Route exact path = "/github" component = {Contribute} />
          <Route exact path = "/edit/:id" component = {UpdateUser} />
          <Route component ={NotFound} />
        </Switch>

    </div>
    </Router>
  );
}
}



export default App;

