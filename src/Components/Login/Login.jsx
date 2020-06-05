import React from "react";
import {reduxForm, Field} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {CheckboxForm, InputForm} from "../common/FormsControls/FormsContorls";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import style from "../common/FormsControls/FormsContorls.module.css";
import {Alert, Button, Divider, Form} from "antd";


const maxLength40 = maxLength(40);




const LoginForm = (props) => {
    const wrapperCol = {  // Set size for form by using antd grid system
        span: 8,
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'} wrapperCol={wrapperCol} validate={[required, maxLength40]} placeholder={'Login'}
                       inputType={'input'}
                       component={InputForm}
                inputStyle={{marginBottom:'1%'}}/>
            </div>
            <div>
                <Field name={'password'} type={'password'} validate={[required, maxLength40]} wrapperCol={wrapperCol}
                       placeholder={'Password'}
                       inputType={'input'}
                       component={InputForm}/>
            </div>
            <div>
                <Field name={'rememberMe'} type={'checkbox'} component={CheckboxForm} checkboxDescription={'Remember me'}/>
            </div>
            {props.captchaURL && <img alt={'Loading...'} src={props.captchaURL}/>}
            {props.captchaURL &&
            <Field name={'captcha'}  validate={[required]} placeholder={'Enter captcha'}
                   inputType={'input'}
                   component={InputForm}/>}
            {props.error && <Alert
                message="Failed"
                description={props.error}
                type="error"
                closable
                className={style.serverError}
            />}
            <div>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>Login
                    </Button>
                </Form.Item>
            </div>
        </form>

    );
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth === true) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <Divider orientation={'left'}>Login</Divider>
            <LoginReduxForm captchaURL={props.captchaURL} onSubmit={onSubmit}/>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuth,
        captchaURL: state.authData.captchaURL
    }
}

export default connect(mapStateToProps, {login})(Login);