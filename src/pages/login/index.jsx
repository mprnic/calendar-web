import { Card } from 'antd';
import React from 'react';
import { GoogleLogin } from 'react-google-login';

import { GoogleApi } from '../../services';

import './login.scss';

export const Login = () => {
    const onLogin = async () => {
        if (await GoogleApi.isUserSignedIn()) {
            window.location.assign('/events');
        }
    }

    return (
        <div className="page">
            <Card className="login-card">
                <h2>Welcome</h2>
                <GoogleLogin
                    buttonText="Login with google"
                    clientId="345993034329-8tdfiosovm6t002r15b51v2oquub78e0.apps.googleusercontent.com"
                    cookiePolicy="single_host_origin"
                    onSuccess={onLogin}
                />
            </Card>
        </div>
    );
}
