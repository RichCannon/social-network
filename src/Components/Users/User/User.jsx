import React from "react";
import s from './User.module.css';
import noPhoto from "../../../asses/img/no-ava.png"
import {NavLink} from "react-router-dom";


const User = ({handlerToggleFollow,followedUsersId,user}) => {


    return (
        <div>
            {
                <div className={s.userCont}>
                    <div className={s.avaAndFollow}>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                                <img className={s.ava} src={user.photos.small ? user.photos.small : noPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            <button
                                disabled={followedUsersId.some(id => id === user.id)}
                                onClick={() => handlerToggleFollow(user.id, user.followed)}>
                                {user.followed ? "FOLLOW" : "UNFOLLOW"}
                            </button>

                        </div>
                    </div>
                    <div className={s.nameAndStatus}>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </div>
                    <div className={s.location}>
                        <div>{"user.location.city"}</div>
                        <div>{"user.location.country"}</div>
                    </div>
                </div>
            }
        </div>
    )
}


export default User;