import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {InputForm} from "../../common/FormsControls/FormsContorls";
import {Button, Col, Row} from "antd";
import {maxLength} from "../../../utils/validators/validators";

const maxLength200 = maxLength(200);

const MyPostsForm = (props) => {
    const textAreaStyle = {
        resize: 'none'
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Row>
                <Col span={24} className={s.myPostField}>
                    <Field component={InputForm} validate={[maxLength200]} inputType={'textArea'}
                           name={'postMessage'} inputStyle={textAreaStyle}
                           rows={4}
                           placeholder={'Start writing your post...'}/>
                    <div>
                        <Button htmlType={'submit'} type="primary">Add post</Button>
                    </div>
                </Col>

            </Row>

        </form>);
}

const MyPostsFormRedux = reduxForm({form: "myPosts"})(MyPostsForm);

const MyPosts = (props) => {

    const userId = props.profilePage.profile.userId;
    const postData = props.profilePage.postData;
    const postElements = postData.map(p => (<Post
        key={p.id}
        message={p.message}
        likeCounter={p.likeCount}
        fullName={props.profilePage.profile.fullName}
        photo={props.profilePage.profile.photos.small}
    />));

    const addPostHandler = (value) => {
        props.addPost(value.postMessage);
    }
    return (
        <div>
            {userId === props.Id ? <MyPostsFormRedux onSubmit={addPostHandler}/> : <div style={{height: '20px'}}></div>}
            <Row className={s.posts}>
                <Col span={24}>
                    {postElements}
                </Col>
            </Row>
        </div>
    );
}

export default MyPosts;