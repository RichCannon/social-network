import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";


const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'postMessage'}/>
            </div>
            <div>
                <button>Add post</button>
                <button>Remove</button>
            </div>
        </form>);
}

const MyPostsFormRedux = reduxForm({form: "myPosts"})(MyPostsForm);

const MyPosts = (props) => {

    const postData = props.profilePage.postData;
    const postsElement = postData.map(p => (<Post key={p.id} message={p.message} likeCounter={p.likeCount}/>));

    const addPostHandler = (value) => {
        props.addPost(value.postMessage);
    }
    return (
        <div>
            My posts
            <MyPostsFormRedux onSubmit={addPostHandler}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
}

export default MyPosts;