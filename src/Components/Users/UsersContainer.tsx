import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {followingInProgress, getUsers, unfollow, follow} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
/*import {withAuthRedirect} from "../../hoc/withAuthRedirect";*/
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {UserItemType} from "../../types/types";


interface MapStatePropsType  {
    pageSize:number
    currentPage: number
    isFetching:boolean
    users: UserItemType[]
    isAuth: boolean
    followedUsersId: number[]
    totalCount: number
}

interface MapDispatchPropsType {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (pageSize:number,currentPage:number) => void
    followingInProgress: (bool:boolean, userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {



    componentDidMount() {
        const {pageSize, currentPage} = this.props
        this.props.getUsers(pageSize, currentPage);
    }

    onPageChanged = (pageNumber:number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageSize, pageNumber);
    }

    handlerToggleFollow = (userId:number, followStatus: boolean) => {
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
                    followedUsersId={this.props.followedUsersId}
                    isAuth={this.props.isAuth}
                />}
        </>)
    }
}


let mapStateToProps = (state:AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalCount: state.usersPage.totalCount,
        isAuth: state.authData.isAuth,
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
    connect<MapStatePropsType,MapDispatchPropsType,{}, AppStateType>(mapStateToProps, {
        followingInProgress,
        getUsers,
        follow,
        unfollow
    })
)(UsersContainer);
