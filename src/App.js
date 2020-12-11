import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import MovieDetail from "./MovieDetail";
import MovieList from "./MovieList";

class App extends Component{
  render(){
    return (
        <Router>
          <Switch>
            <Route exact path={"/"} component={MovieList}/>
            <Route path={"/detail:no"} component={MovieDetail}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
