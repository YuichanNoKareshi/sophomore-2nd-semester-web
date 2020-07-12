import { Result, Button } from 'antd';
import React from "react";

class FalseView extends React.Component{

    handleLogin=()=>{
        this.props.history.replace({pathname: '/'});
    };

    render(){
        return(
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={this.handleLogin}>To Login</Button>}
            />
        )
    }
}

export default FalseView;

