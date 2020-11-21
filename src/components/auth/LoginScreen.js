import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPass } from '../../actions/auth';
import validator from "validator";
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {
    
    // me permite el acceso al dispatch de acciones en redux
    const dispatch = useDispatch()
    const { loading } = useSelector( state => state.ui )
    
    const [formValues, handleInputChange] = useForm({
        email: 'emi@gmail.com',
        password: '123456'
    })
    const { email, password } = formValues
    const {msgError} = useSelector( state => state.ui )
    
    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()){
            dispatch( startLoginEmailPass(email, password) )
        }
    }

    const handleGoogleLogin = () => {
        dispatch ( startGoogleLogin() )
    }

    const isFormValid = () => {
        // validamos el corre se debe instalar npm i validator
        if ( !validator.isEmail( email ) ) {
            dispatch( setError('Invalid email') )
            return false
        }
        dispatch( removeError() )
        return true
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={ handleLogin }>
                {
                    (msgError)&&<div className='auth__alert-error'>{msgError}</div>

                }
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange = { handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange = { handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
