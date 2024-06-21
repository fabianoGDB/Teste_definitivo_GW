//import { ReactComponent as AuthImage } from '../../assets/images/auth-image.svg';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

import './styles.css';
import Register from './Register';

const Auth = () => {

    return (
        <div className="auth-container">
            <div className="auth-banner-container">
                <h1>Contact management </h1>
                <p>Mane you contacts</p>
                
            </div>
            <div className="auth-form-container">
                <Switch>
                    <Route path="/admin/auth/login">
                        <Login />
                    </Route>
                    <Route path="/admin/auth/signup">
                        <Register />
                    </Route>
                    <Route path="/admin/auth/recover">
                        <h1>Card de Recover</h1>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Auth;