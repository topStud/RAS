import './style/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivatePage from "./components/PrivatePage";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import AppMenu from "./components/Navbar";
import CreateAccount from "./components/CreateAccount"

function App() {
  return (
      <Router>
          <div id={'pageContainer'}>
              <header className="App-header">
                  <AppMenu />
              </header>
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path='/privatePage' component={PrivatePage}/>
                  <Route path='/logIn' component={LogIn}/>
                  <Route path='/createAccount' component={CreateAccount}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;

