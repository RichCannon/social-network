import React, {useEffect, useState} from "react";

const ProfileStatusHooks = (props) => {
    let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const onStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    return (
        <div>
            {
                editMode
                    ? <input
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={(e) => onStatusChange(e)}/>
                    : <span
                        onDoubleClick={activateEditMode}>
                            {status || '(Empty)'}
                          </span>
            }
        </div>
    );

}

export default ProfileStatusHooks;