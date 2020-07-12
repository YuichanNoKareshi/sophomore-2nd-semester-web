import React from "react";
import { Table, DatePicker,Button,Tabs } from 'antd';
import { BookOutlined, UserOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

class SaleListMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book_data: [],
            user_data: [],
            begin_time:'',
            end_time:'',
            tag:'',//1代表书籍界面，2代表用户
        };
    }

    componentDidMount=()=> {
        this.getBook();
        this.getUser();
    };

    onNumber=()=>{
        if(this.state.begin_time==='' || this.state.begin_time==='')
        {
            this.getBook();
            this.getUser();
            return;
        }
        let formdata = new FormData();
        formdata.append('begin_time',this.state.begin_time);
        formdata.append('end_time',this.state.end_time);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/BookMostNumbers',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                book_callback(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const book_callback =  (data) => {
            this.setState({book_data:data});
        };

        fetch('http://localhost:8080/UserMostNumbers',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                user_callback(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const user_callback =  (data) => {
            this.setState({user_data:data});
        };
    };

    onProfit=()=>{
        if(this.state.begin_time==='' || this.state.begin_time==='')
        {
            this.getBook();
            this.getUser();
            return;
        }
        let formdata = new FormData();
        formdata.append('begin_time',this.state.begin_time);
        formdata.append('end_time',this.state.end_time);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/BookMostPrices',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                book_callback(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const book_callback =  (data) => {
            this.setState({book_data:data});
        };

        fetch('http://localhost:8080/UserMostPrices',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                user_callback(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const user_callback =  (data) => {
            this.setState({user_data:data});
        };
    };

    getBook=()=>{
        let opts = {
            method: "POST",
        };
        fetch('http://localhost:8080/getBookAndNumbers',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const callback =  (data) => {
            this.setState({book_data:data});
        };
    };

    getUser=()=>{
        let opts = {
            method: "POST",
        };
        fetch('http://localhost:8080/getUserAndNumbers',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const callback =  (data) => {
            this.setState({user_data:data});
        };
    };

    timeChange = (data) =>{
        if (data!==null)
            this.setState({
                begin_time:data[0].format('YYYY-MM-DD'),
                end_time:data[1].format('YYYY-MM-DD'),
            });
        else
            this.setState({
                begin_time:'',
                end_time:'',
            });
    };

    handleTagChange = (key)=>{
        this.setState({
            tag:key,
        });
    };

    render(){
        const book_columns = [
            {
                title: 'book',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'single_price',
                dataIndex: 'price',
                key: 'price',
                render:(text,record) =><p> {record.price}￥</p>
            },
            {
                title: 'number',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'tot_price',
                dataIndex: 'tot_price',
                key: 'tot_price',
                render:(text,record) =><p> {record.tot_price}￥</p>
            },
        ];

        const user_columns = [
            {
                title: 'username',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'order_number',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: 'consumption',
                dataIndex: 'tot_price',
                key: 'tot_price',
                render:(text,record) =><p> {record.tot_price}￥</p>
            },
        ];

        return(
            <div>
                <Button type="primary" shape="round" style={{float:"left",marginLeft:"20%"}} onClick={this.onNumber}>
                    Number List
                </Button>
                <RangePicker format="YYYY-MM-DD" onChange={this.timeChange} style={{marginLeft:"10%"}}/>
                <Button type="primary" shape="round" style={{float:"right",marginRight:"20%"}} onClick={this.onProfit}>
                    Profit List
                </Button>
                <Tabs defaultActiveKey="1" size={"large"} tabBarGutter="50%" style={{marginLeft:"1%"}} onChange={this.handleTagChange}>
                    <TabPane tab={
                            <span>
                                <BookOutlined />
                                Book
                            </span>
                            }
                             key="1" >
                        <Table
                            columns={book_columns}
                            bordered
                            dataSource={this.state.book_data}
                        />
                    </TabPane>
                    <TabPane tab={<span>
                                <UserOutlined />
                                User
                            </span>} key="2" >
                        <Table
                            columns={user_columns}
                            bordered
                            dataSource={this.state.user_data}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default SaleListMain;
