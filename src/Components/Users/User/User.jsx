import React from "react";
import s from './User.module.css';
import {NavLink} from "react-router-dom";
import {Avatar, Button, Col, Row, Tooltip, Typography} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";


const User = ({handlerToggleFollow, followedUsersId, user, isAuth}) => {
    const {Title} = Typography;

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <div className={s.userCont}>
                    <div className={s.avaAndFollow}>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                                <Avatar size={70} src={user.photos.small} icon={<UserOutlined/>}/>
                            </NavLink>
                        </div>
                        <div>
                            <Tooltip placement="bottom" title={!isAuth && 'You need to be authorized'}>
                                <Button
                                    type={user.followed ? '' : 'primary'}
                                    danger={user.followed}
                                    disabled={!isAuth || followedUsersId.some(id => id === user.id)}
                                    onClick={() => handlerToggleFollow(user.id, user.followed)}>
                                    {user.followed ? "UNFOLLOW" : "FOLLOW"}
                                </Button>
                            </Tooltip>

                        </div>
                    </div>
                    <div className={s.nameAndStatus}>
                        <Title level={4}>{user.name}</Title>
                        <div>{user.status}</div>
                    </div>
                    <div className={s.location}>
                        <div>{'user.location.city'}</div>
                        <div>{'user.location.country'}</div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}


export default User;
