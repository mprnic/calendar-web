import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Event, Homepage, Login } from './pages';
import { GoogleApi } from './services';

import './index.scss';

export const App = () => {
    const [isGapiLoaded, setIsGapiLoaded] = useState(false);

    useEffect(() => {
        GoogleApi.init(setIsGapiLoaded);
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/events">
                    <Homepage isGapiLoaded={isGapiLoaded} />
                </Route>
                <Route path="/events/:id">
                    <Event isGapiLoaded={isGapiLoaded} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
