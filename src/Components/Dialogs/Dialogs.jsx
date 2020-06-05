import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import AllMessages from "./allMessages/AllMessages";
import {Route} from "react-router";
import {Col, Row} from "antd";


const Dialogs = (props) => {
    const messageData = props.dialogs.messageData;

    const dialogElement = messageData.map(d => (<DialogItem key={d.id} dialogData={d}/>));
    const messageElement = messageData.map(m => (
        <Route key={m.id} path={`/dialogs/${m.id}/`}
               render={() => <AllMessages key={m.id}
                                          sendMessageHandler={props.sendMessage}
                                          userMessage={m}
               />}
        />));
    return (
        <Row className={s.diaWithMess} gutter={16} >
            <Col span={7} >
                {dialogElement}
            </Col>
            <Col span={17}>
                {messageElement}
            </Col>
        </Row>
    );
}

export default Dialogs;