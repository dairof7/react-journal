import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPass = (email, pass) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then( ({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch ( e => {
                console.log(e)
                dispatch(finishLoading())
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ({ user }) => {
                // de esta manera se actualiza el nombre ya que cuando se usar
                // solo correo y pass no se guarda el name
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName))
            })
            .catch ( e => {
                console.log(e)
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})