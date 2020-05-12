import React from "react";

export default class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.status !== prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode
                        ? <input
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}
                            onChange={(e) => this.onStatusChange(e)}/>
                        : <span
                            onDoubleClick={this.activateEditMode}>
                            {this.props.status}
                          </span>
                }
            </div>
        );
    }
}