import React, {useState} from "react";
/*import s from './Post.module.css';*/
import {Avatar, Col, Comment, Row, Tooltip} from "antd";
import {LikeOutlined, LikeFilled} from '@ant-design/icons';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

const Post = (props) => {
    const [likes, setLikes] = useState(props.likeCounter);
    const [action, setAction] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const like = () => {
        if (isLiked) {
            setLikes(+likes - 1);
            setIsLiked(false);
            setAction('');
        } else {
            setLikes(+likes + 1);
            setIsLiked(true);
            setAction('liked');
        }
    };

    const item = {
        boxShadow: ' 0.4em 0.4em 5px rgba(122,122,122,0.5)',
        borderRadius: '5px',
        padding: '5px',
        paddingLeft: '15px',
        backgroundColor: 'white',
    }


    const actions = [
        <span key="comment-basic-like">
      <Tooltip title="Like">
        {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
            onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>
    ]

    return (
        <Row gutter={[0,12]}>
            <Col span={24} >
                <Comment style={item}
                         actions={actions}
                         content={props.message}
                         author={props.fullName}
                         avatar={<Avatar
                             size={'large'}
                             src={props.photo}
                             icon={<UserOutlined />}/>}>

                </Comment>
            </Col>

        </Row>
    );
}

export default Post;


/*
<div className={s.item}>
    <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRg0-v4ALmUjHaTQIYXO3lhI1FQ9TIkpt8WW-9GY05Cc5XxbWCx&usqp=CAU"/>
    {props.message}
    <div>
        <span>LIKE! {props.likeCounter}</span>
    </div>
</div>*/
