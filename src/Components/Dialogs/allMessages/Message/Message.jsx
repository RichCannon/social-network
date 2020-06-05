import React from "react";

import {Col, Row} from "antd";

const Message = (props) => {
    return (
        <Row  gutter={[0,16]}>
            <Col>
                {props.message}
            </Col>
        </Row>
    );
}

export default Message;