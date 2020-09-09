import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import userReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    dialogs: dialogsReducer ,
    profilePage: profileReducer,
    usersPage: userReducer,
    authData: authReducer,
    form: formReducer,
    appData: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

/*let store = createStore(reducers, applyMiddleware(thunkMiddleware));*/

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
//window.store = store
export default store
