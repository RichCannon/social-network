import React from "react";
import s from './Users.module.css';
import Pagination from "../common/Pagination/Pagination";
import User from "./User/User";


const Users = (props) => {

    return (
        <div>
            {props.users.map((user) => {
                return <User key={user.id}
                             handlerToggleFollow={props.handlerToggleFollow}
                             user={user}
                             followedUsersId={props.followedUsersId}/>
            })}
            <div className={s.allPages}>
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