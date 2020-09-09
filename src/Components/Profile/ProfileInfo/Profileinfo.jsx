import React, {useState} from "react";
import s from './Profileinfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import {ProfileData, ProfileDataEditForm} from "./ProfileData/ProfileData";
import {Avatar, Col, Row, Typography} from 'antd';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";


const ProfileInfo = ({profile, changePhoto, status, updateStatus, myId, saveProfile}) => {
    const photoLarge = profile.photos.large;
    const {Title} = Typography;
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return (<Preloader/>);
    }
    const onPhotoChange = (e) => {
        if (e.target.files.length) {
            changePhoto(e.target.files[0]);
        }
    }

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
    };
    const onSubmit = (formData) => {
        saveProfile(formData);
        deactivateEditMode();
    }

    return (
        <div>
            <Row className={s.profile} gutter={{sm: 0, xl: 24}}>
                <Col lg={12} sm={24} className={s.containerANS} >
                    <Row gutter={16} className={s.avaNameStatus} >
                        <Col sm={11}  xs={24} className={s.avaCont}>
                                <Avatar  className={s.profileImg} shape={"square"}
                                        src={photoLarge} icon={<UserOutlined />} />
                        </Col>
                        <Col lg={10} xl={13} className={s.statusAndName}>
                            <Title level={3}>{profile.fullName}</Title>
                            <ProfileStatusHooks currentId={profile.userId} myId={myId} status={status}
                                                updateStatus={updateStatus}/>
                            {profile.userId === myId ? <input type={'file'} onChange={(e) => onPhotoChange(e)}/> : null}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12} sm={24} className={s.containerData} >
                    {editMode
                        ? <ProfileDataEditForm profile={profile}
                                               initialValues={profile} onSubmit={onSubmit}/>
                        : <ProfileData currentId={profile.userId} myId={myId} activateEditMode={activateEditMode}
                                       profile={profile}/>}
                </Col>
            </Row>
        </div>
    );
}


export default ProfileInfo;

