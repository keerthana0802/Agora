import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
// import { withRouter } from 'react-router';
import LodableLoading from './Containers/LodableLoading';

const StudentScreen = Loadable({
  loader: () => import('./Containers/Student'),
  loading: LodableLoading
});
const TeacherScreen = Loadable({
  loader: () => import('./Containers/Teacher'),
  loading: LodableLoading
});

const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={StudentScreen} />
      <Route exact path="/teacher" component={TeacherScreen} />
    </Switch>
   </Router>
  )

export default MainRouter