import React, {useState} from "react";

import {InputForm} from "../../common/FormsControls/FormsContorls";
import {Field, reduxForm} from "redux-form";
import {maxLength} from "../../../utils/validators/validators";
import NoData from "../../common/NoData/NoData";
import {Tooltip} from "antd";


const ProfileStatusHooks = (props) => {

    let [editMode, setEditMode] = useState(false);

    const deactivateEditMode = (status) => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const activateEditMode = () => {
        if (props.myId !== props.currentId) return;
        setEditMode(true);
    };

    const onSubmit = (form) => {
        deactivateEditMode(form.status);
    }


    return (
        <div>
            <StatusFieldForm initialValues={{status: props.status}} status={props.status} onSubmit={onSubmit}
                             editMode={editMode} activateEditMode={activateEditMode}/>
        </div>
    );

}

const maxlength20 = maxLength(20);


const StatusField = ({editMode, handleSubmit, activateEditMode, status}) => {
    return (<>{
        editMode
            ? <form onBlur={handleSubmit}>
                <Field name={'status'}
                       inputType={'input'}
                       component={InputForm}
                       validate={[maxlength20]}
                       autoFocus={true}
                       touched={true}
                       wrapperCol={{span: 18}}
                /></form>
            : <span onDoubleClick={activateEditMode}>
                      {status
                          ? <Tooltip placement="bottom" title={'Double click to change status'}> {status} </Tooltip>
                          : <NoData/>}
            </span>
    }</>)
}

const StatusFieldForm = reduxForm({form: 'status'})(StatusField);

export default ProfileStatusHooks;

/*<Tooltip placement="bottom" title={'Double click to change status'}> </Tooltip>         */