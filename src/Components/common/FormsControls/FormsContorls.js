import React from "react";
/*import styles from "./FormsContorls.module.css"*/
import {Checkbox, Form, Input} from "antd";


/*export const Input = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={styles.formControl + ' ' + (hasError && styles.error)}>
            <input  {...input}   {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}*/

const formType = ({rows, ...props}, input, inputType, inputStyle) => {

    const {Password, TextArea} = Input;
    if (inputType === 'input') {
        if (props.type === 'password') {
            return <Password style={inputStyle} {...props} {...input} />
        }
        return <Input style={inputStyle} {...props} {...input}/>
    } else if (inputType === 'textArea') {
        return <TextArea style={inputStyle} rows={rows} {...props} {...input}/>
    }
}


export const InputForm = ({input, touched, meta, wrapperCol, inputType, inputStyle, ...props}) => {
    const isTouched = touched ? true : meta.touched;
    const hasError = meta.error && isTouched;

    return (
        <Form.Item wrapperCol={wrapperCol}
                   hasFeedback
                   validateStatus={hasError ? 'error' : ""}
                   help={hasError && meta.error}
                    style={{marginBottom:'0'}}>
            {formType(props, input, inputType, inputStyle)}
        </Form.Item>
    );
}


/*export const TextArea = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={styles.formControl + ' ' + (hasError && styles.error)}>
            <textarea  {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}*/

export const CheckboxForm = ({input, ...props}) => {
    return (
        <Form.Item>
            <Checkbox>{props.checkboxDescription}</Checkbox>
        </Form.Item>
    );
}

