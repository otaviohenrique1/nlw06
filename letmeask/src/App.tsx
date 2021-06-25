import React from 'react';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <Route path="/" component={Home} exact />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

/*
  [ReactJS] Aula 03 –> Tempo -> 00:44:58
*/
