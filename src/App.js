import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import {Login} from './Login';
import {Register} from './Register';
import {Dashboard} from './Dashboard';
import {Error} from './Error';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
