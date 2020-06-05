import React from "react";
/*import s from './Profile.module.css';*/
import ProfileInfo from "./ProfileInfo/Profileinfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div /*className={s.content}*/>
            <ProfileInfo  saveProfile = {props.saveProfile} myId={props.myId} profile={props.profile}
                          status={props.status} updateStatus={props.updateStatus} changePhoto={props.changePhoto}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;