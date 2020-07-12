import React from "react";
import {Table, Input, Button, Checkbox, Popconfirm, notification} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class CartMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // book_id
            // bookName
            // tot_number
            // tot_price
            // inventory
            searchText: '',
            searchedColumn: '',
            chosen: [],//记录已选中的书的book_id
            lastChosen: [],
            disabled: false,
            checkAll: false,
        };
        this.handleChooseAll= this.handleChooseAll.bind(this);
        this.handleBuy= this.handleBuy.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.getData=this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = () =>{
        let username=sessionStorage.getItem('user');
        let formdata = new FormData();
        formdata.append('username',username);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/getLikes',opts)
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
            this.setState({data:data});
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
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 ,float:'right'}}>
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

    handleChoose = (book_id) => {
        let newChosen = this.state.chosen;
        let exist=false;
        for (let i=0;i<newChosen.length;i++)
        {
            if (newChosen[i]===book_id) {newChosen.splice(i,1); exist=true;}//如果已选则改成未选
        }

        if(exist === false)  newChosen.splice(0,0,book_id);//如果未选则改成已选
        this.setState({
            chosen: newChosen,
        });
    }

    handleChooseAll = () => {
        if (this.state.checkAll === true)
        {
            const newChosen = this.state.lastChosen;
            this.setState({
                chosen: newChosen,
                checkAll: false,
                disabled: false,
            });
        }
        else //checkAll====false
        {
            let newChosen = [];
            const lastChosen = this.state.chosen;//记录未全选时的选择
            const data = this.state.data;
            for (let i=0;i<data.length;i++)
                newChosen.splice(newChosen.length,0,data[i].book_id);
            this.setState({
                lastChosen: lastChosen,
                chosen: newChosen,
                checkAll: true,
                disabled: true,
            });
        }
    }

    handleDelete = (book_id) => {
        let username=sessionStorage.getItem('user');
        let formdata = new FormData();
        formdata.append('book_id',book_id);
        formdata.append('username',username);
        let opts = {method: "POST", body: formdata};

        fetch('http://localhost:8080/deleteLike',opts)
            .then(() => {
                let newChosen = this.state.chosen;
                let lastChosens =this.state.lastChosen;
                for (let i=0;i<newChosen.length;i++)
                {
                    if (newChosen[i]===book_id) newChosen.splice(i,1);//如果已选则改成未选
                    this.setState({
                        chosen: newChosen,
                    });
                }
                for (let i=0;i<lastChosens.length;i++)
                {
                    if (lastChosens[i]===book_id) lastChosens.splice(i,1);//如果已选则改成未选
                    this.setState({
                        lastChosen: lastChosens,
                    });
                }
            })
            .then(()=>{
                this.getData();
            });

    }

    contain = (book_id) => {
        for (let i=0;i<this.state.chosen.length;i++)
            if (this.state.chosen[i] === book_id) return true;
        return false;
    }

    containAll=()=>{
        return (this.state.data.length === this.state.chosen.length && this.state.chosen.length!==0)
    }

    handleBuy = () =>{
        let chosenData = [];//chosenData用来记录已选中的data中元素
        for (let i=0; i<this.state.chosen.length; i++)
        {
            let keyI = this.state.chosen[i];
            for (let j=0; j<this.state.data.length; j++)
            {
                let keyJ = this.state.data[j];
                for (var k in keyJ)
                    if (k === 'book_id' && keyJ[k]===keyI)
                        chosenData = [...chosenData,keyJ];
            }

        }//确定chosenData
        if (chosenData.length===0)
        {
            this.alert('WARNING','You are buying nothing!');
            return;
        }
        let username=sessionStorage.getItem('user');

        let book_ids=new Array();
        let book_nums=new Array();
        let price=0;
        for (let i=0;i<chosenData.length;++i)
        {
            book_ids[i]= chosenData[i].book_id;
            book_nums[i]= chosenData[i].tot_number;
            price = price + chosenData[i].tot_price;
        }

        let d=new Date();
        let year=d.getFullYear();
        let month=d.getMonth()+1;
        let day=d.getDate();
        let date=year+'-'+month+'-'+day;

        let formdata = new FormData();
        formdata.append('username',username);
        formdata.append('book_ids',book_ids);
        formdata.append('book_nums',book_nums);
        formdata.append('price',price);
        formdata.append('date',date);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/saveOrder',opts)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                if (data !== "")
                {
                    this.alert('WARNING',data+'you are buying are more than inventory!' );
                }

                else
                {
                    this.getData();
                    this.setState(
                        {chosen: [],
                            lastChosen: [],
                            disabled: false,
                            checkAll: false,}
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    alert = (mess,des) =>{
        notification.open({
            message: mess,
            description: des,
        });
    };

    render() {
        const columns = [
            {
                title: 'book_id',
                dataIndex: 'book_id',
                key: 'book_id',
                width: '10%',
                ...this.getColumnSearchProps('book_id'),
            },
            {
                title: 'bookName',
                dataIndex: 'book_name',
                key: 'book_name',
                width: '30%',
                ...this.getColumnSearchProps('book_name'),
            },
            {
                title: 'tot_number',
                dataIndex: 'tot_number',
                key: 'tot_number',
                width: '10%',
                ...this.getColumnSearchProps('tot_number'),
            },
            {
                title: 'tot_price',
                dataIndex: 'tot_price',
                key: 'tot_price',
                width: '20%',
                ...this.getColumnSearchProps('tot_price'),
            },
            {
                title: 'inventory',
                dataIndex: 'inventory',
                key: 'inventory',
                width: '10%',
                ...this.getColumnSearchProps('inventory'),
            },
            {
                title: 'choose',
                dataIndex: 'choose',
                render:(text,record) =>
                    <div className="site-drawer-render-in-current-wrapper">
                        <Checkbox
                            checked={this.contain(record.book_id)}
                            onChange={() => this.handleChoose(record.book_id)}
                            disabled={this.state.disabled}
                        >choose</Checkbox>
                    </div>
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.book_id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        return (
            <div>
                <div >
                    <Checkbox
                        checked={this.state.checkAll}
                        onChange={this.handleChooseAll}
                        style={{float:'right',margin:'0 11% 0 0'}}
                    >
                        Check all
                    </Checkbox>
                </div>

                <div>
                    <Table columns={columns} bordered dataSource={this.state.data} />
                    <Button type="primary" danger size='large' onClick={this.handleBuy}>
                        Buy
                    </Button>
                </div>
            </div>
        );
    }
}

export default CartMain;