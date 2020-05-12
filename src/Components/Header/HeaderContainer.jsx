import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuth, logout, setUserData} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
  /*  componentDidMount() {
        this.props.getAuth();
    }
*/
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => ({
    login: state.authData.login,
    isAuth: state.authData.isAuth
})

export default connect(mapStateToProps, {setUserData, getAuth, logout})(HeaderContainer);