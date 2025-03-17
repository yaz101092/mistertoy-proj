import { userService } from "../../services/user.service.js"
// import { CLEAR_CART, TOGGLE_CART_IS_SHOWN } from "../reducers/car.reducer.js"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}


// export function checkout(diff) {
//     return userService.updateScore(-diff)
//         .then(newScore => {
//             store.dispatch({ type: SET_USER_SCORE, score: newScore })
//             store.dispatch({ type: CLEAR_CART })
//             store.dispatch({ type: TOGGLE_CART_IS_SHOWN })
//         })
//         .catch((err) => {
//             console.log('user actions -> Cannot checkout', err)
//             throw err
//         })
// }
