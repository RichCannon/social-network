import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    setCurrentPage,
    setUsers,
    setTotalUsersCount, toggleIsFetching, followingInProgress, getUsers, unfollow, follow
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
/*import {withAuthRedirect} from "../../hoc/withAuthRedirect";*/
import {compose} from "redux";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(this.props.pageSize, pageNumber);
    }

   handlerToggleFollow = (userId, followStatus) => {
        this.props.followingInProgress(true, userId);
        if (followStatus) {
            this.props.unfollow(userId);
        } else {
            this.props.follow(userId);
        }
    }

    render() {
        return (<>
            {this.props.isFetching ? <Preloader/> :
                <Users
                    handlerToggleFollow={this.handlerToggleFollow}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    totalCount={this.props.totalCount}
                    onPageChanged={this.onPageChanged}
                    pageSize={this.props.pageSize}
                    followingInProgress={this.props.followingInProgress}
                    followedUsersId={this.props.followedUsersId}
                    follow = {this.props.follow}
                    unfollow = {this.props.unfollow}
                />}
        </>)
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalCount: state.usersPage.totalCount,

        isFetching: state.usersPage.isFetching,
        followedUsersId: state.usersPage.followedUsersId
    }
}

/*let mapDispatchToProps = (dispatch) => {
    return {
        toggleFollow: (userId) => {
            dispatch(toggleFollowAC(userId));
        },
        /!*  unfollow: (userId) => {
              dispatch(unfollowAC(userId));
          },*!/
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }

    }
}*/

export default compose(
    connect(mapStateToProps, {
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching,
        followingInProgress,
        getUsers,
        follow,
        unfollow
    })
)(UsersContainer);
