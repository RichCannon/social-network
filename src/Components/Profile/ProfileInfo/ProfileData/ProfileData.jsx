import React from "react";
import s from "../Profileinfo.module.css";
import {Field, reduxForm} from "redux-form";
import {InputForm, CheckboxForm} from "../../../common/FormsControls/FormsContorls";
import {Divider, Button, Row, Col} from "antd";
import NoData from "../../../common/NoData/NoData";


export const ProfileData = ({profile, activateEditMode, currentId, myId}) => {
    let isLookingForAJob;

    if (profile.lookingForAJob === undefined) {
        isLookingForAJob = <NoData/>
    } else if (profile.lookingForAJob === false) {
        isLookingForAJob = 'No';
    } else if (profile.lookingForAJob === true) {
        isLookingForAJob = 'Yes';
    }



    return (
        <Row className={s.profileInfo}>
            <Col span={24}>
                <Row>
                    <Col span={10}><b>lookingForAJob: </b></Col> <Col
                    span={14}>{isLookingForAJob}</Col>
                </Row>
                <Row>
                    <Col span={10}> <b>lookingForAJobDescription: </b>
                    </Col>
                    <Col span={14}>
                        {profile.lookingForAJobDescription || <NoData/>}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}> <Divider orientation={'left'}>Contacts: </Divider>
                    </Col>
                </Row>
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <Row key={key}>
                            <Col span={4} offset={3} key={key}>
                                <b>{key}: </b>
                            </Col>
                            <Col span={17}>
                                {profile.contacts[key] || <NoData/>}
                            </Col>
                        </Row>
                    )
                })}
                <Row>
                    <Col span={5}> <b>aboutMe: </b></Col><Col span={10}>{profile.aboutMe || <NoData/>}
                </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {currentId === myId ?
                            <Button style={{width: '100%'}} onClick={activateEditMode}>EDIT PROFILE</Button> : null}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}


const ProfileDataEdit = React.memo(({handleSubmit, profile}) => {
    return (
        <div className={s.profileInfo}>
            <form onSubmit={handleSubmit}>

                <Field name={'fullName'} placeholder={'Full Name'}
                       component={InputForm} inputType={'input'}/> {/*Editing field for fullName*/}

                <Field name={'lookingForAJob'} type={'checkbox'}
                       checkboxDescription={'lookingForAJob'}
                       component={CheckboxForm}/> {/*Checkbox for lookingForAJob*/}

                <Field name={'lookingForAJobDescription'}
                       placeholder={'lookingForAJobDescription'} inputType={'textArea'}
                       component={InputForm}/> {/*Editing field forlookingForAJobDescription*/}

                <span><Divider orientation={'left'}>Contacts: </Divider></span>
                {Object.keys(profile.contacts).map((key) => {
                    return <Field key={key} name={'contacts.' + key}
                                  placeholder={key} component={InputForm} inputType={'input'}/>
                })}

                <Field name={'aboutMe'} placeholder={'aboutMe'}
                       component={InputForm} inputType={'textArea'}/> {/* TextArea for editing field AboutMe*/}

                <Button type="primary" htmlType={'submit'}>SAVE CHANGES</Button>
            </form>
        </div>
    );
})


export const ProfileDataEditForm = reduxForm({form: 'profileData'})(ProfileDataEdit);