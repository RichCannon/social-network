import React,{FC} from "react";
import s from './Users.module.css';
import User from "./User/User";
import {Col, Row} from "antd";
import {UserItemType} from "../../types/types";
import Pagination from "../common/Pagination/Pagination";



export interface PropsType  {
    users: UserItemType[]
    isAuth: boolean
    followedUsersId: number[]
    pageSize: number
    totalCount: number
    currentPage: number


    handlerToggleFollow: (userId:number, followStatus:boolean)=> void
    onPageChanged: (pageNumber: number) => void
}





const Users:FC<PropsType> = (props) => {

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


export default Users
