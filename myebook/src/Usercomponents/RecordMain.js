import { Card,Table, Input, Button,DatePicker,Tabs } from 'antd';
import { SearchOutlined, BookOutlined, BarsOutlined } from '@ant-design/icons';
import React from "react";

const { Meta } = Card;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

class RecordMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // order_id
            // tot_price
            // date
            tag2_data:[],
            searchText: '',
            searchedColumn: '',
            begin_time:'',
            end_time:'',
            tag:'',
        };
        // this.handleChooseAll= this.handleChooseAll.bind(this);
        // this.handleBuy= this.handleBuy.bind(this);
        this.getData=this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getAllData2();
    }

    getData = () => {
        let username=sessionStorage.getItem('user');

        let formdata =new FormData();
        formdata.append('username',username);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/getOrders',opts)
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
            this.setState({
                data:data,
            });
        };
    };

    getAllData2 = () => {
        let username=sessionStorage.getItem('user');
        let formdata =new FormData();
        formdata.append('username',username);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/getAllRecordByUser',opts)
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
            this.setState({
                tag2_data:data,
            });
        };
    };

    findItem = (order_id) => {
        for (let i=0;i<this.state.data.length;i++)
        {
            if(this.state.data[i].order_id === order_id) return this.state.data[i].items;
        }
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />

                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>

            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => text,
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleTagChange = (key)=>{
        this.setState({
            tag:key,
        });
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

    handleConsumeList=()=> {
        if (this.state.begin_time === '' || this.state.begin_time === '') {
            this.getAllData2();
            return;
        }
        let username=sessionStorage.getItem('user');
        let formdata = new FormData();
        formdata.append('username',username);
        formdata.append('begin_time', this.state.begin_time);
        formdata.append('end_time', this.state.end_time);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/getRecordByUser', opts)
            .then((response) => {
                if (response===null) this.setState({tag2_data: []});
                return response.json()
            })
            .then((data) => {
                book_callback(data);
            })
            .catch((error) => {
                console.log(error);
            });

        const book_callback = (data) => {
            this.setState({tag2_data: data});
        };
    };

    render(){
        const item_columns = [
            {
                title: 'cover',
                dataIndex: 'cover',
                width: '20%',
                render:(text,record) =>
                    <Card
                        hoverable
                        cover={<img alt="book" src={record.picture} />}
                    >
                        <Meta description={record.name} />
                    </Card>
            },
            { title: 'book', dataIndex: 'name', key: 'name', ...this.getColumnSearchProps('name') },
            { title: 'number', dataIndex: 'number', key: 'number', ...this.getColumnSearchProps('number') },
            { title: 'tot_price', dataIndex: 'prices', key: 'prices', ...this.getColumnSearchProps('prices') },
        ];
        const order_columns = [
            { title: 'date', dataIndex: 'date', key: 'date', ...this.getColumnSearchProps('date')},
            {
                title: 'order_item',
                dataIndex: 'order_item',
                key: 'order_item',
                width:'80%',
                render:(text,record) =>
                    <Table
                        columns={item_columns}
                        bordered
                        dataSource={this.findItem(record.order_id)}
                        pagination={ false }
                    />
            },
            { title: 'tot_price', dataIndex: 'tot_price', key: 'tot_price', ...this.getColumnSearchProps('tot_price') },
        ];
        const columns = [
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

        return(
            <div>
                <Tabs defaultActiveKey="1" size={"large"} tabBarGutter="50%" style={{marginLeft:"1%"}} onChange={this.handleTagChange}>
                    <TabPane tab={<span>
                                <BookOutlined />
                                Record
                            </span>} key="1" >
                        <Table
                            columns={order_columns}
                            bordered
                            dataSource={this.state.data}
                        />
                    </TabPane>
                    <TabPane tab={<span>
                                <BarsOutlined />
                                Statistic
                            </span>} key="2" >
                        <RangePicker format="YYYY-MM-DD" onChange={this.timeChange} style={{marginLeft:"20%"}}/>
                        <Button type="primary" shape="round" style={{float:"right",marginRight:"30%"}} onClick={this.handleConsumeList}>
                            Consume List
                        </Button>
                        <Table
                            columns={columns}
                            bordered
                            dataSource={this.state.tag2_data}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}


export default RecordMain;
