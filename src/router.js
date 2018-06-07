import React from 'react';
import ToDo from './components/ToDo';
import DetailedTask from './components/DetailedTask';
import { Switch, Route } from 'react-router-dom';

export default (
  <Switch>
    <Route path='/todo' component={ToDo} exact />
    <Route path='/DetailedTask/:id' component={DetailedTask} />
  </Switch>
)
