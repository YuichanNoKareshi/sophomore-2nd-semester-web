import { Card,Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import React from "react";

const { Meta } = Card;
class UserOrderMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indexUser: '',
            data: [],
            // order_id
            // tot_price
            // date
            searchText: '',
            searchedColumn: '',
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let indexUser=sessionStorage.getItem('indexUser');

        let formdata =new FormData();
        formdata.append('username',indexUser);

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
                indexUser:indexUser,
                data:data,
                date:data.year+'-'+data.month+'-'+data.day,
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
        return(
            <div>
                <h1 style={{marginLeft:"1%"}}>{this.state.indexUser}'s Orders</h1>
                <Table
                    columns={order_columns}
                    bordered
                    dataSource={this.state.data}
                />
            </div>
        );
    }
}


export default UserOrderMain;
