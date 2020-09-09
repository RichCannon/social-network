import React, {useState} from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";


const Navbar = () => {

    const [collapsible,setCollapsible] = useState(false)

    const [collapsed,setCollapsed] = useState(false)




    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }

    return (
            <Sider breakpoint={'sm'}  collapsedWidth={0}
                   collapsed={collapsed} onCollapse={onCollapse}
                width={200}  mode={'inline'}
                   className={s.sideBar}
            >
                <Menu theme={'dark'} mode={'inline'}>
                    <Menu.Item key='1'>
                        <NavLink to='/profile'>Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <NavLink to='/dialogs'>Messages</NavLink>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <NavLink to='/news'>News</NavLink>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <NavLink to='/music'>Music</NavLink>
                    </Menu.Item>
                    <Menu.Item key='5'>
                        <NavLink to='/settings'>Settings</NavLink>
                    </Menu.Item>
                    <Menu.Item key='6'>
                        <NavLink to='/users'>Users</NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>

    );
}

export default Navbar;
