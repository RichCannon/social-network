import React, {useEffect, useState} from "react";
import Profile from "./Profile";
import {
    getStatus,
    getUsersProfile,
    setUserProfile,
    updateStatus,
    changePhoto,
    saveProfile
} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";


const ProfileContainer = (props) => { /*My Id 7628*/

    const [isLoading, setIsLoading] = useState(true);
    const idFormUrl = props.match.params.userId;
    const userId = idFormUrl || props.myId;
    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            Promise.all([
                props.getUsersProfile(userId),// Receiving profile data (img, name etc.) for user by his id (API)
                props.getStatus(userId)  // Receiving status for user by his id (API)
            ]).then(() => {
                setIsLoading(false);
            })

        } else {
            props.history.push("/login"); // If you are not authorized on site this will redirect you to /login page
        }
    }, [userId])

    return isLoading ? <Preloader/> : <Profile {...props}/>

}

//----------------------------------------------------

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myId: state.authData.id
})

export default compose(
    connect(mapStateToProps,
        {
            setUserProfile, getUsersProfile,
            getStatus, updateStatus,
            changePhoto, saveProfile
        }),
    withRouter/*,
    withAuthRedirect*/
)(ProfileContainer)


/*
class ProfileContainer extends React.Component {
    componentDidMount() { /!*My Id 7628*!/
        console.log(this.props.myId);
        const idFormUrl = this.props.match.params.userId;
        this.userId = idFormUrl ? idFormUrl : this.props.myId; // Id from URL
        if (this.userId) {
            this.props.getUsersProfile(this.userId); // Receiving profile data (img, name etc.) for user by his id (API)
            this.props.getStatus(this.userId); // Receiving status for user by his id (API)
        } else {
            this.props.history.push("/login"); // If you not authorized on site this will redirect to /login page
        }
    }

    render() {
    console.log('render Profile')
        return (
            <Profile {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myId: state.authData.id
})

export default compose(
    connect(mapStateToProps,
        {
            setUserProfile, getUsersProfile,
            getStatus, updateStatus
        }),
    withRouter/!*,
    withAuthRedirect*!/
)(ProfileContainer)
*/
