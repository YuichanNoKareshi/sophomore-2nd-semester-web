import React, {Component} from 'react';
import {Input, Button, notification,message} from 'antd';
import 'antd/dist/antd.css';
import '../css/addbook.css'

const { TextArea } = Input;

class AddBookView extends Component {
    constructor(props) {
        super(props);
        this.state ={
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
        formdata.append('name',this.state.name);
        formdata.append('author',this.state.author);
        formdata.append('isbn',this.state.isbn);
        formdata.append('price',this.state.price);
        formdata.append('inventory',this.state.inventory);
        formdata.append('introduction',this.state.introduction);
        formdata.append('picture',this.state.imageUrl);
        let opts = {
            method: "POST",
            body: formdata,
        };
        fetch('http://localhost:8080/addBook',opts)
            .then(() => {
                message.info('Add success!');
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
            <div className="addBook-page">
                <div className="addBook-container">
                    <div className="addBook-box">
                        <h1 className="page-title">Add Book</h1>
                        <div className="addBook-content" >

                            <div>
                                <div style={{float:"left"}} width={"40%"}>
                                    name:<Input size="large" placeholder="name" onChange={this.nameChange}/>
                                </div>
                                <div style={{float:"right"}} width={"40%"}>
                                    author:<Input size="large" placeholder="author"  onChange={this.authorChange}/>
                                </div>
                            </div>
                            <br/>
                            <div>
                                <div style={{float:"left"}} width={"40%"}>
                                    price:<Input size="large" placeholder="price" onChange={this.priceChange}/>
                                </div>
                                <div style={{float:"right"}} width={"40%"}>
                                    inventory:<Input size="large" placeholder="inventory" onChange={this.inventoryChange}/>
                                </div>
                            </div>
                            <br/>
                            isbn:<Input size="large" placeholder="isbn" onChange={this.isbnChange}/>
                            <br/>
                            introduction:<TextArea placeholder="introduction" rows={4} onChange={this.introductionChange}/>
                            <br/>
                            <input type="file" onChange={this.previewFile}/>
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


export default AddBookView;
