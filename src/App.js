import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {initializingProcess} from "./redux/app-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Preloader from "./Components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
//import DialogsContainer from "./Components/Dialogs/DialogsContainer";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"));


class App extends React.Component {
    componentDidMount() {
        this.props.initializingProcess();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route render={() =>
                            <ProfileContainer/>} path='/profile/:userId?'/>
                        <Route render={withSuspense(DialogsContainer)} path='/dialogs'/>
                        <Route render={News} path='/news'/>
                        <Route render={Music} path='/music'/>
                        <Route render={Settings} path='/settings'/>
                        <Route render={() =>
                            <UsersContainer/>} path='/users'/>
                        <Route render={() =>
                            <Login/>} path='/login'/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


const mapDispatchToProps = (state) => ({
    initialized: state.appData.initialized
})

export default compose(
    connect(mapDispatchToProps, {initializingProcess})
)(App);