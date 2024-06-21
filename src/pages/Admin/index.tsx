import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import PrivateRoute from '../../components/PrivateRoute';

import './styles.css';
//import Products from './Products';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/contacts">
            <h1>contacts CRUD</h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/users" >
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
