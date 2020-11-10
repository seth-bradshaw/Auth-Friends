import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Login from './components/Login'
import FriendsList from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  const showLink = ()=>{
    if(isLoggedIn){
      return(
      <li>
        <Link to='friends'>Friends List</Link>
      </li>
      )
    } else {
      return (<div></div>)
    }
  }

  return (
    <Router>
    <div className="App">
      <h1>Hello Fuckers</h1>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/login' onClick={logout}>Logout</Link>
        </li>
        {
          showLink()
        }
      </ul>
      <Switch>
        <Route path='/login' render={(props)=> {
          return <Login {...props}  setLoggedIn={setLoggedIn}/>
        }}/>
        <PrivateRoute exact path='/friends' component={FriendsList}/>
        <Route component={Login} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
