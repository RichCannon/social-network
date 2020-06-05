import React from "react";
import s from './AllMessages.module.css';
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {InputForm} from "../../common/FormsControls/FormsContorls";
import {Button, Col, Row} from "antd";


const SendMessageForm = (props) => {

    const inputStyle = {
        flexGrow:1,
        resize:'none'
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter your message...'}
                   name={'message'}
                   component={InputForm}
                   inputType={'textArea'}
                   inputStyle={inputStyle}
                   rows={3}
            />
            <Button type={"primary"}  htmlType={'submit'} >Send</Button>
        </form>
    );
}

const SendMessageRF = reduxForm({form: "sendMessage"})(SendMessageForm);

const AllMessages = (props) => {
    const id = props.userMessage.id;
    const message = props.userMessage.message;

    const onSubmit = (formData) => {
        props.sendMessageHandler(id, formData.message);
    }

    const messages = message.map((m) => <Message key={m} message={m}/>)

    return (
        <Row className={s.allMessages}>
            <Col>
                {messages}
            </Col>
            <SendMessageRF onSubmit={onSubmit}/>
        </Row>
    );
}

export default AllMessages;