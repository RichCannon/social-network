import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import { HashRouter, Redirect, Route, Switch} from "react-router-dom";
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
import {Layout} from "antd";



const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"));
const {Content,Sider} = Layout;

class App extends React.Component {
    componentDidMount() {
        this.props.initializingProcess();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        setInterval(()=>{
            if(document.getElementsByClassName('tw-button tw-button--success tw-interactive')[0]){
                document.getElementsByClassName('tw-button tw-button--success tw-interactive')[0].click();
            }
        },10000)

        return (
            <HashRouter> {/*HashRouter only for deploying on gitHub hosting*/}
                <Layout style={{minHeight: '100vh', margin: 'auto', backgroundColor:'white'}}>
                    <HeaderContainer/>
                    <Layout style={{width: '80%', margin: 'auto'}}>
                        <Sider width={200}/>
                        <Navbar/>
                        <Content style={{margin: '1%', padding:'1%'}}>
                            <Switch>
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
                                <Redirect exact from="/" to="/profile"/>
                                <Route path='*'
                                       render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </HashRouter>
        );
    }
}


const mapDispatchToProps = (state) => ({
    initialized: state.appData.initialized
})

export default compose(
    connect(mapDispatchToProps, {initializingProcess})
)(App);