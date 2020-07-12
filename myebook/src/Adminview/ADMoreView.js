import React from "react";
import {Button, Card, notification} from "antd";
import '../css/more.css';

const { Meta } = Card;

class ADMoreView extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            id: this.props.match.params.id,
            bookName: '',
            author:'',
            price: '',
            inventory:'',
            introduction: '',
            tot_number: 0,
            image:''
        };
        this.handleBack = this.handleBack.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSub = this.handleSub.bind(this);
    }
    componentWillMount() {
        if (sessionStorage.getItem('isAdmin') !== '1')
            this.props.history.replace({pathname: '/False'});
    }

    componentDidMount() {
        this.getBook();
    }

    getBook = () =>{
        let formdata = new FormData();
        formdata.append('id',this.state.id);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/getBook',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if(data != null) {
                    this.setState({
                        bookName:data.name,
                        author:data.author,
                        price:data.price,
                        inventory:data.inventory,
                        introduction:data.bookmore.introduction,
                        image:data.bookmore.picture,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleBack = () => {
        this.props.history.replace({pathname:'/ADhome'});
    }

    handleAdd = () => {
        let num=this.state.tot_number+1;
        this.setState({tot_number: num});
    }

    handleSub = () => {
        let num= (this.state.tot_number===0) ? 0 : (this.state.tot_number-1);
        this.setState({tot_number: num});
    }

    handleConfirm = () =>{
        if (this.state.tot_number === 0)
        {
            this.alert("WARNING","You haven't chosen the number of the book!")
            return;
        }
        else if (this.state.tot_number > this.state.inventory)
        {
            this.alert("WARNING","You can't choose such a large number!")
            return;
        }

        let username=sessionStorage.getItem('user');

        let tot_price=this.state.tot_number * this.state.price;
        let formdata = new FormData();
        formdata.append('username',username);
        formdata.append('book_id',this.state.id);
        formdata.append('bookName',this.state.bookName);
        formdata.append('tot_number',this.state.tot_number);
        formdata.append('tot_price',tot_price);

        let opts = {
            method: "POST",
            body: formdata,
        };

        fetch('http://localhost:8080/saveLike',opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.getBook();
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
        return (
            <div  className={'more-page'}>
                    <Card
                        className={'more-box'}
                        hoverable
                        style={{ width: 400 }}
                        cover={<img alt="example" src={this.state.image} />}
                    >
                        <Meta title={this.state.bookName} />
                        <Meta description={`author: ${this.state.author}`}/>
                        <Meta description={`introduction: ${this.state.introduction}`} />
                        <Meta description={`price: ${this.state.price}￥ inventory: ${this.state.inventory}`} />

                        <br/>
                        <Button type="primary" danger onClick={this.handleBack} >Back</Button>

                        <Button type="primary" style={{float:'right',marginLeft:"30px"}} onClick={this.handleConfirm}>
                            Put into cart
                        </Button>

                        <Button shape="circle" style={{float:'right'}} onClick={this.handleAdd}>
                            +
                        </Button>
                        <Button type="link"  style={{float:'right'}}>{this.state.tot_number}</Button>
                        <Button shape="circle" style={{float:'right'}} onClick={this.handleSub}>
                            -
                        </Button>


                    </Card>
            </div>

        );


    }
}


export default ADMoreView;
