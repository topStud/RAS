import './style/App.css';
import AppMenu from './components/Navbar.js'
import AppBody from './components/AppBody.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivatePage from "./components/PrivatePage";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/privatePage' component={PrivatePage}/>
              <Route path='/logIn' component={LogIn}/>
          </Switch>
      </Router>
  );
}

export default App;
