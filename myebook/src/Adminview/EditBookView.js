import React, {Component} from 'react';
import {Input, Button, notification, message} from 'antd';
import 'antd/dist/antd.css';
import '../css/editbook.css'

const { TextArea } = Input;

class EditBookView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            id: this.props.match.params.id,
            name: '',
            author: '',
            isbn: '',
            price: '',
            inventory: '',
            introduction: '',
            imageUrl: '',
            loading: false,
        };
    }
    componentWillMount() {
        if (sessionStorage.getItem('isAdmin') !== '1')
            this.props.history.replace({pathname: '/False'});
    }

    componentDidMount() {
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
                        name:data.name,
                        author:data.author,
                        isbn:data.isbn,
                        price:data.price,
                        inventory:data.inventory,
                        introduction:data.bookmore.introduction,
                        imageUrl:data.bookmore.picture,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    nameChange=(e)=>{this.setState({ name : e.target.value })};
    authorChange=(e)=>{this.setState({ author : e.target.value })};
    isbnChange=(e)=>{this.setState({ isbn : e.target.value })};
    priceChange=(e)=>{this.setState({ price : e.target.value })};
    inventoryChange=(e)=>{this.setState({ inventory : e.target.value })};
    introductionChange=(e)=>{this.setState({ introduction : e.target.value })};

    handleBack = () => {this.props.history.replace({pathname: '/ADhome'});};

    handleConfirm = () => {
        if (this.state.name==='') {this.alert('ERROR!','Please input book name!'); return;}
        else if (this.state.author==='') {this.alert('ERROR!','Please input book author!');return;}
        else if (this.state.isbn==='') {this.alert('ERROR!','Please input book isbn!');return;}
        else if (this.state.price==='') {this.alert('ERROR!','Please input book price!');return;}
        else if (this.state.inventory==='') {this.alert('ERROR!','Please input book inventory!');return;}
        else if (this.state.introduction==='') {this.alert('ERROR!','Please input book introduction!');return;}
        else if (this.state.imageUrl==='') {this.alert('ERROR!','Please upload book cover!');return;}
        //先判断信息是否为空

        let formdata = new FormData();
        formdata.append('id',this.state.id);
        formdata.append('name',this.state.name);
        formdata.append('author',this.state.author);
        formdata.append('isbn',this.state.isbn);
        formdata.append('price',this.state.price);
        formdata.append('inventory',this.state.inventory);
        formdata.append('introduction',this.state.introduction);
        formdata.append('picture',this.state.imageUrl);
        console.log(this.state.isbn);
        let opts = {
            method: "POST",
            body: formdata,
        };
        fetch('http://localhost:8080/editBook',opts)
            .then(() => {
                message.info('Edit success!');
            });
    };

    alert = (mess,des) =>{
        notification.open({
            message: mess,
            description: des,
        });
    };

    previewFile=()=> {
        let preview = document.querySelector('img');
        let file    = document.querySelector('input[type=file]').files[0];
        let reader  = new FileReader();

        reader.addEventListener("load",  ()=> {
            preview.src = reader.result;
            this.setState({imageUrl:reader.result});
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    render() {
        return (
            <div className="editBook-page">
                <div className="editBook-container">
                    <div className="editBook-box">
                        <h1 className="page-title">Edit Book</h1>
                        <div className="editBook-content" >

                            <div>
                                <div style={{float:"left"}} width={"40%"}>
                                    name:<Input size="large" placeholder="name"
                                           onChange={this.nameChange} value={this.state.name}
                                    />
                                </div>
                                <div style={{float:"right"}} width={"40%"}>
                                    author:<Input size="large" placeholder="author"
                                           onChange={this.authorChange} value={this.state.author}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div>
                                <div style={{float:"left"}} width={"40%"}>
                                    price:<Input size="large" placeholder="price"
                                           onChange={this.priceChange} value={this.state.price}
                                    />
                                </div>
                                <div style={{float:"right"}} width={"40%"}>
                                    inventory:<Input size="large" placeholder="inventory"
                                           onChange={this.inventoryChange} value={this.state.inventory}
                                    />
                                </div>
                            </div>
                            <br/>
                            isbn:<Input size="large" placeholder="isbn" onChange={this.isbnChange} value={this.state.isbn}/>
                            <br/>
                            introduction:<TextArea placeholder="introduction" rows={4}
                                      onChange={this.introductionChange} value={this.state.introduction}
                            />
                            <br/>
                            <input type="file" multiple={} onChange={this.previewFile}/>
                            <br/>
                            <img src={this.state.imageUrl} height="200" alt=""/>
                            <br/>
                            <Button shape="round" size="large"  onClick={this.handleBack} >cancel</Button>
                            <Button type="primary" shape="round" size="large"  style={{float:"right"}} onClick={this.handleConfirm}>confirm</Button>

                        </div>
                    </div>
                </div>

            </div>
        );


    }
}


export default EditBookView;
