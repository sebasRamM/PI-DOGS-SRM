import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home/Home'
import Details from './components/Details/Details'
import Form from './components/Form/Form'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/home" component={Home}/>
          <Route path='/dogDetail/:id' component={Details}/>
          <Route path='/dog' component={Form}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
