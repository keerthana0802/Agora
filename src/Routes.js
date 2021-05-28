import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
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

const LoginScreen = Loadable({
  loader: () => import('./Containers/Login'),
  loading: LodableLoading
});

const BeforeClassScreen = Loadable({
  loader: () => import('./Containers/BeforeClass'),
  loading: LodableLoading
});
const WaitingRoomScreen = Loadable({
  loader: () => import('./Containers/WaitingRoom'),
  loading: LodableLoading
});

const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/" component={StudentScreen} />
      <Route exact path="/teacher" component={TeacherScreen} />
      <Route exact path="/Beforeclass" component={BeforeClassScreen} />
      <Route exact path="/Waitingroom" component={WaitingRoomScreen} />
    </Switch>
  </Router>
);

export default MainRouter;
