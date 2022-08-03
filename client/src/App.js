import { Route } from 'react-router-dom'

import Landing from './components/Landing'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Detail from './components/Detail'
import Add from './components/Add'

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Navbar}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/detail" component={Navbar}/>
      <Route exact path="/detail/:id" component={Detail}/>
      <Route exact path="/add" component={Add}/>
    </div>
  );
}

export default App;
