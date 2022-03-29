import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '@pages/Home/Home';
import CryptoCoin from '@pages/CryptoCoin/CryptoCoin';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/currency" component={CryptoCoin} />
      </Switch>
    </Router>
  );
}

export default App;
