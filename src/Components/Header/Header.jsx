import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../asses/img/logo.png"

const Header = (props) => {
    const loginLogout = () => {
        if (props.login) {
            return (
                <>
                    <div onClick={props.logout}>
                        LOGOUT
                    </div>
                    <div>{props.login}</div>
                </>
            )
        }
        return (<NavLink to='/login'>LOGIN</NavLink>)
    }

    return (
        <header className={s.header}>
            <img alt={'Loading...'} src={logo}/>

            <div className={s.logBut}>
                {loginLogout()}
            </div>
        </header>
    );
}

export default Header;