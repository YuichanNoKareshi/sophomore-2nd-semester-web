import React from 'react';
import ADHeader from "../Admincomponents/ADHeader";
import ADSider from "../Admincomponents/ADSider";
import ADCartMain from "../Admincomponents/ADCartMain";
import '../css/home.css'
import {Layout} from "antd";
const { Content } = Layout;

class ADCartView extends React.Component{
    componentWillMount() {
        if (sessionStorage.getItem('isAdmin') !== '1')
            this.props.history.replace({pathname: '/False'});
    }

    render(){
        return(
            <Content>
                <layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <ADHeader history={this.props.history}/>
                    <div id="Contain">
                        <div id="Contain-side" ><ADSider history={this.props.history} /></div>
                        <div id="Contain-main"><ADCartMain history={this.props.history} /></div>
                    </div>
                </layout>
            </Content>
        )
    }
}

export default ADCartView;