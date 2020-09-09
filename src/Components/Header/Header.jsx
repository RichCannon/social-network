import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/logo.bmp"
import {Layout, Menu} from "antd";

const {Header} = Layout;

const HeaderComponent = (props) => {
    const loginLogout = () => {
        if (props.login) {
            return (
                <Menu style={{float: 'right'}} theme={"dark"} mode="horizontal">
                    <Menu.Item key={'1'} onClick={props.logout}>
                        LOGOUT
                    </Menu.Item>
                    <Menu.Item key={'2'} disabled={true}>{props.login}</Menu.Item>
                </Menu>

            )
        }
        return (
            <Menu style={{float: 'right'}} theme={"dark"} mode="horizontal">
                <Menu.Item key={'1'}>
                    <NavLink to='/login'>LOGIN</NavLink>
                </Menu.Item>
            </Menu>
        )
    }

    return (
        <Header className={s.header} >
            <NavLink to={'/profile'}>
                <img className={s.siteLogo} alt={'Loading...'} src={logo}/>
            </NavLink>

            {loginLogout()}
        </Header>

    );
}

export default HeaderComponent;
