import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

import {Login} from './Login';
import {Register} from './Register';
import {Dashboard} from './Dashboard';
import {Error} from './Error';

function App() {
  return (
    <Router>
      {/*no need to use switch in our case however it is good practice.
       could be used if there were multiple conflicting routes*/}
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
        {/* matches all routes except the ones specified above */}
        <Route path="/">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
