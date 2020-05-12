import React from "react";
import {reduxForm, Field} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {Input} from "../common/FormsControls/FormsContorls";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import style from "../common/FormsControls/FormsContorls.module.css";


const maxLength40 = maxLength(40);
const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required,maxLength40]} name={'email'} placeholder={'Login'} c component={Input}/>
            </div>
            <div>
                <Field type={'password'} validate={[required,maxLength40]} name={'password'} placeholder={'Password'} component={Input}/>
            </div>
            <div>
                <Field name={'rememberMe'} type={'checkbox'} component={'input'}/>Remember me
            </div>
            {props.error && <div className={style.serverError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if(props.isAuth === true) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )

}

const mapStateToProps = (state)=>{
    return {
        isAuth:state.authData.isAuth
    }
}

export default connect(mapStateToProps,{login})(Login);