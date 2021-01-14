import React from 'react';
import './App.css';
import Admin from './pages/admin/admin';
import Home from './pages/home/home';
import SchoolList from './pages/schoolList/activeSchoolList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from './navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AdminSchoolList from './pages/schoolList/adminSchoolList';
import StaffList from './pages/schoolList/staffList';

function App() {
  return (
    <Router>
    <div className='App'>
    <Navigation />
      <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/admin' component={Admin} />
      <Route path='/home' component={Home} />
      <Route path='/schools' component={SchoolList} />
      <Route path='/adminSchoolList' component={AdminSchoolList} />
      <Route path='/staffList' component={StaffList} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;