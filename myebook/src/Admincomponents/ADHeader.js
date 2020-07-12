import React from 'react';
import '../css/home.css'
import { Layout,Button } from 'antd';

const { Header } = Layout;


class ADHeader extends React.Component {

    handleOut =()=>{
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAdmin');
        this.props.history.replace({pathname: '/'});
    }

    render(){
        return(
                <Header  className="header">
                    <h1 className="head_h1">EBook</h1>
                    <Button type="danger" shape="round" size='large' style={{float:"right",marginTop:11}} onClick={this.handleOut}>
                        SIGN OUT
                    </Button>
                </Header>
        );
    }
}


export default ADHeader;