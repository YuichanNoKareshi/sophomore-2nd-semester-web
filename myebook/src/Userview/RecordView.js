import React from 'react';
import MyHeader from "../Usercomponents/myHeader";
import MySider from "../Usercomponents/mySider";
import '../css/home.css'
import {Layout} from "antd";
import RecordMain from "../Usercomponents/RecordMain";
const { Content } = Layout;

class RecordView extends React.Component{
    componentWillMount() {
        if (sessionStorage.getItem('isAdmin') !== '1' && sessionStorage.getItem('isAdmin') !== '0')
            this.props.history.replace({pathname: '/False'});
    }

    render(){
        return(
            <Content>
                <layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <MyHeader history={this.props.history}/>
                    <div id="Contain">
                        <div id="Contain-side" ><MySider history={this.props.history} /></div>
                        <div id="Contain-main"><RecordMain history={this.props.history} /></div>
                    </div>
                </layout>
            </Content>
        )
    }
}

export default RecordView;