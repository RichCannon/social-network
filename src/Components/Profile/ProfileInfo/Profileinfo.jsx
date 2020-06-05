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
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return (<Preloader/>);
    }
    const onPhotoChange = (e) => {
        if (e.target.files.length) {
            changePhoto(e.target.files[0])
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
            <Row style={{marginLeft: '0px'}} gutter={24}>
                <Col span={14} className={s.avaNameStatus}>
                    <Row gutter={16}>
                        <Col span={11}>
                            <div>
                                <Avatar className={s.profileImg} shape={"square"}
                                        size={300} src={photoLarge} icon={<UserOutlined />} />
                            </div>
                        </Col>
                        <Col span={13} className={s.statusAndName}>
                            <Title level={3}>{profile.fullName}</Title>
                            <ProfileStatusHooks currentId={profile.userId} myId={myId} status={status}
                                                updateStatus={updateStatus}/>
                            {profile.userId === myId ? <input type={'file'} onChange={(e) => onPhotoChange(e)}/> : null}
                        </Col>
                    </Row>
                </Col>
                <Col span={10}>
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

