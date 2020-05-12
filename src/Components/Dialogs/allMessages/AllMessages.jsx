import React from "react";
import s from './AllMessages.module.css';
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";


const SendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter your message...'}
                   name={'message'}
                   className={s.sendMessageField}
                   component={'textarea'}/>
            <button  className={s.sendButton}>Send</button>
        </form>
    );
}

const SendMessageRF = reduxForm({form: "sendMessage"})(SendMessageForm);

const AllMessages = (props) => {
    const id = props.userMessage.id;
    const message = props.userMessage.message;

    const onSubmit = (formData) => {
        console.log(formData);
        props.sendMessageHandler(id, formData.message);
    }
    console.log(message);
    const messages = message.map((m) => <Message key={m} message={m}/>)

    return (
        <div className={s.allMessages}>
            <div>
                {messages}
            </div>
            <SendMessageRF onSubmit={onSubmit}/>
        </div>
    );
}

export default AllMessages;