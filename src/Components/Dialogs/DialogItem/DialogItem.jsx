import React from "react";
import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    const dialogData = props.dialogData;
    const path = `/dialogs/${dialogData.id}`

    return (
        <NavLink to={path}>
            <div className={s.dialogItem}>
                <img alt={'Loading...'} className={s.ava} src={dialogData.imgURL}/>
                <div className={s.userName}>{dialogData.name}</div>
                <div className={s.userMessage}>{dialogData.message[dialogData.message.length -1]} </div>
            </div>
        </NavLink>
    );
}

export default DialogItem;