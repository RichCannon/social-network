import React from "react";
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRg0-v4ALmUjHaTQIYXO3lhI1FQ9TIkpt8WW-9GY05Cc5XxbWCx&usqp=CAU"/>
            {props.message}
            <div>
                <span>LIKE! {props.likeCounter}</span>
            </div>
        </div>
    );
}

export default Post;
