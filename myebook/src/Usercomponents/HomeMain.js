import React from 'react';
import { Table, Input, Button, Card } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;

class HomeMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            count: 0,
            searchText: '',
            searchedColumn: '',
            visible_num: -1,
        };
    }

    componentDidMount=()=> {
        this.getBooks();
    }

    getBooks =()=>{
        let opts = {
            method: "POST",
        };

        fetch('http://localhost:8080/getBooks',opts)
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
            this.setState({dataSource:data});
            let count=this.state.dataSource.length;
            this.setState({count:count});
        };
    }

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
                    style={{ width: 90, marginRight: 8 }}
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
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
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

    showMore = id => {
        this.props.history.push({pathname:`/more/${id}`});
    };

    render() {
        const columns = [
            {
                title: 'cover',
                dataIndex: 'cover',
                width: '20%',
                render:(text,record) =>
                    <Card
                        hoverable
                        onClick={()=>this.showMore(record.id)}
                        cover={<img alt="book" src={record.bookmore.picture} />}
                    >
                        <Meta description={record.name} />
                    </Card>
            },
            {
                title: 'name',
                dataIndex: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'author',
                dataIndex: 'author',
                ...this.getColumnSearchProps('author'),
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                ...this.getColumnSearchProps('isbn'),
            },
            {
                title: 'price',
                dataIndex: 'price',
                render:(text,record) =><p> {record.price}￥</p>
            },
            {
                title: 'inventory',
                dataIndex: 'inventory',
                ...this.getColumnSearchProps('inventory'),
            },

        ];

        return (
            <div>
                <Table
                    bordered
                    dataSource={this.state.dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default HomeMain;