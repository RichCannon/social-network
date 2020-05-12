import React from "react";
import styles from "./FormsContorls.module.css"



export const Input = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={styles.formControl + ' ' + (hasError && styles.error)}>
            <input  {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

