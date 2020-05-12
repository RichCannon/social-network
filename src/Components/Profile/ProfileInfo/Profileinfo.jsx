import React from "react";
import s from './Profileinfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import noPhoto from "../../../asses/img/no-prfl-photo.jpg"
import ProfileStatusHooks from "./ProfileStatusHooks";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return (<Preloader/>);
    }
    const photo = props.profile.photos.large;
    return (
        <div>
            {/*<div>
                <img className={s.profileImg} src='https://starpri.ru/wp-content/uploads/2019/04/maxresdefault.jpg'/>
            </div>*/}
            <div className={s.userInfo}>
                <img className={s.profileImg} src={photo ? photo : noPhoto}/>
                <div className={s.statusAndName}>
                    <div className={s.userName}>{props.profile.fullName}</div>
                    <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>
            </div>
        </div>
    );

}

export default ProfileInfo;


