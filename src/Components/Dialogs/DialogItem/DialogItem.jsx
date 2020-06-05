import React from "react";
import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import {Avatar, Col, Row} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

const DialogItem = (props) => {
    const dialogData = props.dialogData;
    const path = `/dialogs/${dialogData.id}`

    return (
        <Row  gutter={[0,16]}>
            <Col span={24} >
                <NavLink to={path}>
                    <div className={s.dialogItem}>
                        <Avatar className={s.ava} src={dialogData.imgURL} size={50} icon={<UserOutlined />}/>
                        <div className={s.userName}><b>{dialogData.name}</b></div>
                        <div className={s.userMessage}>{dialogData.message[dialogData.message.length - 1]} </div>
                    </div>
                </NavLink>
            </Col>
        </Row>
    );
}

export default DialogItem;