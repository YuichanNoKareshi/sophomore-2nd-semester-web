import React, {Component} from 'react';
import {Input, Button, notification} from 'antd';
import 'antd/dist/antd.css';
import '../css/signup.css'
import { UserOutlined } from '@ant-design/icons'

class SignUpView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username:'',
            password1:'',
            password2:'',
            email:'',
        }
        this.userChange = this.userChange.bind(this);
        this.password1Change = this.password1Change.bind(this);
        this.password2Change = this.password2Change.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.callback = this.callback.bind(this);
        this.alert = this.alert.bind(this);
    }

    userChange(e){
        this.setState({ username : e.target.value })
    };

    password1Change(e){
        this.setState({ password1 : e.target.value })
    };
    password2Change(e){
        this.setState({ password2 : e.target.value })
    };

    emailChange(e){
        this.setState({ email : e.target.value })
    };

    handleCancel = () => {
        this.props.history.replace({pathname: '/'});
    };

    handleSignUp = () => {
        if (this.state.username==='')
        {
            this.alert('ERROR!','Please input your username!');
            return;
        }
        else if (this.state.password1==='')
        {
            this.alert('ERROR!','Please input your password!');
            return;
        }
        else if (this.state.email==='')
        {
            this.alert('ERROR!','Please input your email!');
            return;
        }//先判断用户名、密码、邮箱是否为空

        let reEml = /^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i;
        if (reEml.test(this.state.email)===false)
        {
            this.alert('ERROR!','Email format is wrong!')
            return;
        }
        else if (this.state.password1 !== this.state.password2)//如果两次密码不一致
        {
            this.alert('ERROR!','Two passwords are not the same!')
            return;
        }//再判断两次密码是否一致、邮箱是否符合规范

        let formdata = new FormData();
        formdata.append('username',this.state.username);
        formdata.append('password',this.state.password1);
        formdata.append('email',this.state.email);
        let opts = {
            method: "POST",
            body: formdata,
        };
        fetch('http://localhost:8080/saveUser',opts)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.callback(data);
            })
    };

    callback = (data) => {
        if(data === 1)//username重复
            this.alert('SIGNUP FAIL!','Username has already existed!')
        else if(data === 2)//email重复
            this.alert('SIGNUP FAIL!','Email has already existed!')
        else{
            sessionStorage.setItem('user', this.state.username);
            sessionStorage.setItem('isAdmin', '0');
            this.props.history.replace({pathname: '/home'});
        }
    };

    alert = (mess,des) =>{
        notification.open({
            message: mess,
            description: des,
        });
    }

    render() {
        return (
            <div className="signUp-page">
                <div className="signUp-container">
                    <div className="signUp-box">
                        <h1 className="page-title">Sign Up</h1>
                        <div className="signUp-content">

                            <Input size="large" placeholder="username" prefix={<UserOutlined />} onChange={this.userChange}/>
                            <br/>
                            <Input.Password size="large" placeholder="password" onChange={this.password1Change}/>
                            <br/>
                            <Input.Password size="large" placeholder="password again" onChange={this.password2Change}/>
                            <br/>
                            <Input size="large" placeholder="email" onChange={this.emailChange}/>
                            <br/>
                            <br/>
                            <Button shape="round" size="large"  onClick={this.handleCancel} >cancel</Button>
                            <Button type="primary" shape="round" size="large"  style={{float:"right"}} onClick={this.handleSignUp}>confirm</Button>

                        </div>
                    </div>
                </div>

            </div>
        );


    }
}


export default SignUpView;
