import React from "react";
import s from './Users.module.css';
import Pagination from "../common/Pagination/Pagination";
import User from "./User/User";
import {Col, Row} from "antd";


const Users = (props) => {

    const usersArray = props.users.map((user) => {
        return <User key={user.id}
                     isAuth={props.isAuth}
                     handlerToggleFollow={props.handlerToggleFollow}
                     user={user}
                     followedUsersId={props.followedUsersId}/>
    })

    return (
        <div>
            <Row >
                <Col span={24}>
                    {usersArray}
                </Col>
            </Row>
            <div  className={s.allPages}>
                <Pagination
                    pageSize={props.pageSize}
                    totalCount={props.totalCount}
                    currentPage={props.currentPage}
                    onPageChanged={props.onPageChanged}
                />
            </div>

        </div>
    )
}


export default Users;