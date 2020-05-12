import React from "react";
import Profile from "./Profile";
import {getStatus, getUsersProfile, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    componentDidMount() { /*My Id 7628*/

        const idFormUrl = this.props.match.params.userId;
        this.userId = idFormUrl ? idFormUrl : this.props.myId; // Id from URL
        if (this.userId) {
            this.props.getUsersProfile(this.userId);
            this.props.getStatus(this.userId); // Receiving status for user by his id
        } else {
            this.props.history.push("/login");
        }
    }

    render() {

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
    withRouter/*,
    withAuthRedirect*/
)(ProfileContainer)