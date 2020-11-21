import {firebase} from '../firebase/firebase-config';
import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

export const AppRouter = () => {

// esto se va a ejecutar cada vez que el estado de la autenticacion cambie
// o bien cada vez que se recargue el navegador
    const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            // si el usuario existe, verifique el uid
            if (user?.uid){
                dispatch(login(user.uid, user.displayName))
            }
        } )
        // basicamente evita el warning porq no cambia la funcion
    }, [dispatch])

    return (
        <Router>
            <div>
                <Switch>
                    <Route 
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <Route 
                        exact
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
