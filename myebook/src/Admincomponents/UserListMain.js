import React from "react";
import {List, Card, notification} from "antd";
import { StopOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import '../css/more.css';

class UserListMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () =>{
        let opts = {
            method: "POST"
        };
        fetch('http://localhost:8080/getUsers',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if(data != null) {
                    this.setState({
                        users:data,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleBan=(username)=>{
        let formdata = new FormData();
        formdata.append('username',username);
        let opts = {
            method: "POST",
            body: formdata,
        };
        fetch('http://localhost:8080/banUser',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.getUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleUnBan=(username)=>{
        let formdata = new FormData();
        formdata.append('username',username);
        let opts = {
            method: "POST",
            body: formdata,
        };
        fetch('http://localhost:8080/banUser',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.getUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleBanAdmin=(username)=>{
        let yourself=sessionStorage.getItem('user');
        if (yourself===username)
        {
            this.alert('?',"What are you doing?");
        }
        else this.alert('WARNING',"You cannot forbid another admin to login our ebook!");

    };

    showOrder=(username)=>{
        sessionStorage.setItem('indexUser',username);
        this.props.history.push({pathname:`/UserOrder`});
    };

    showAdminOrder=(username)=>{
        let yourself=sessionStorage.getItem('user');
        if (yourself===username)
        {
            sessionStorage.setItem('indexUser',username);
            this.props.history.push({pathname:`/UserOrder`});
        }
        else this.alert('WARNING',"You cannot look over another admin's orders!");
    };

    alert = (mess,des) =>{
        notification.open({
            message: mess,
            description: des,
        });
    };

    render() {
        return(
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={this.state.users}
                renderItem={item =>
                    item.administrator === 1 ?
                    (
                        <List.Item>
                            <Card title={item.username}
                                  actions={[
                                      <StopOutlined key="edit" onClick={()=>this.handleBanAdmin(item.username)}/>,
                                      <InfoCircleOutlined key="ellipsis" onClick={()=>this.showAdminOrder(item.username)} />,
                                  ]}
                            >
                                <p>administrator</p>
                                <p>email: {item.email}</p>
                                <p style={{color:"green"}}>normal</p>

                            </Card>
                        </List.Item>
                    ):
                    (
                        item.ban === 0 ?
                        (
                            <List.Item>
                                <Card title={item.username}
                                      actions={[
                                          <StopOutlined key="edit" onClick={()=>this.handleBan(item.username)} />,
                                          <InfoCircleOutlined key="ellipsis" onClick={()=>this.showOrder(item.username)} />,
                                      ]}
                                >
                                    <p>password: {item.password}</p>
                                    <p>email: {item.email}</p>
                                    <p style={{color:"green"}}>normal</p>
                                </Card>
                            </List.Item>
                        ):
                        (
                            <List.Item>
                                <Card title={item.username}
                                      actions={[
                                          <CheckCircleOutlined key="edit" onClick={()=>this.handleUnBan(item.username)} />,
                                          <InfoCircleOutlined key="ellipsis" onClick={()=>this.showOrder(item.username)} />,
                                      ]}
                                >
                                   <p>password: {item.password}</p>
                                   <p>email: {item.email}</p>
                                   <p style={{color:"red"}}>banned</p>
                                </Card>
                            </List.Item>
                        )
                    )
                }
            />
        )
    }
}


export default UserListMain;