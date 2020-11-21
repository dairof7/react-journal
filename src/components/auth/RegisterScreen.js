import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    // me permite acceder a mi state
    const {msgError} = useSelector( state => state.ui )
    
    const [{name, email, password, password2}, handleInputChange] = useForm({
        name: 'Emilio',
        email: 'emi@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch( startRegisterWithEmailPasswordName( email, password, name ) )
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0){
            dispatch( setError('Name is required') )
            return false;
        // validamos el corre se debe instalar npm i validator
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Invalid email') )
            return false
        } else if (password2 !== password || password.length < 6) {
            dispatch( setError('Password too short') )
            return false
        }

        dispatch( removeError() )
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                {
                    (msgError)&&<div className='auth__alert-error'>{msgError}</div>

                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}

                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
