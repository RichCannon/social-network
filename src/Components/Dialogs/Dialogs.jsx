import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import AllMessages from "./allMessages/AllMessages";
import {Route} from "react-router";


const Dialogs = (props) => {
    const messageData = props.dialogs.messageData;

    const dialogElement = messageData.map(d => (<DialogItem key ={d.id} dialogData={d}/>));
    const messageElement = messageData.map(m => (
       <Route key ={m.id} path={`/dialogs/${m.id}/`}
              render={() => <AllMessages key ={m.id}
                  sendMessageHandler={props.sendMessage}
                  userMessage={m}
              />}
       />));
    return (
        <div className={s.diaWithMess}>
            <div className={s.allDialogs}>
                {dialogElement}
            </div>
            <div>
                {messageElement}
            </div>
        </div>
    );
}

export default Dialogs;