import React from 'react';
import {View, Text, Image, StyleSheet, AsyncStorage, DeviceEventEmitter} from 'react-native';
import { Button } from 'react-native-elements';
import {apiUrl} from '../urlconfig';

const SAVELIKE_URL=apiUrl+"/saveLike";
export class BookScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            tot_number:0
        }
    }

    handleAdd = () =>{
        let num=this.state.tot_number;
        num=num+1;
        this.setState({tot_number:num});
    };

    handleSub = () =>{
        let num=this.state.tot_number;
        num = (num===0)?0:num-1;
        this.setState({tot_number:num});
    };

    handleConfirm = () =>{
        let detail=this.props.route.params.detail;
        AsyncStorage.getItem('user').then((result)=>
        {
            let formdata = new FormData();
            formdata.append('username',result);
            formdata.append("book_id", detail.id);
            formdata.append("bookName", detail.name);
            formdata.append("tot_number", this.state.tot_number);
            formdata.append("tot_price", this.state.tot_number * detail.price);
            fetch(SAVELIKE_URL, {
                method: 'POST',
                body:formdata
            })
                .then((response) => response.json())
                .then((responseData) => {
                    DeviceEventEmitter.emit('likes', 'add likes');
                })
                .catch((error)=> {
                    console.error(error);
                });
        });

    }

    render(){
        let detail=this.props.route.params.detail;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={{uri: detail.bookmore.picture}}
                    style={styles.image}
                />
                <View >
                    <Text style={styles.name}>{detail.name}</Text>
                </View>
                <View >
                    <Text >作者：{detail.author}</Text>
                    <Text>单价：¥{detail.price}</Text>
                    <Text>库存：{detail.inventory}</Text>
                </View>
                <View>
                    <Text style={styles.description}>{detail.bookmore.introduction}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop:10}}>
                    <Button title="-" onPress={this.handleSub}/>
                    <Button title={`${this.state.tot_number}`} type="clear" disabled={true}/>
                    <Button title="+" onPress={this.handleAdd}/>
                </View>
                <View style={{marginTop:10}}>
                    <Button title="加入购物车" type="outline" onPress={this.handleConfirm}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    name:{
        fontSize:20
    },
    image: {
        width: 182,
        height: 245
    },
    description:{
        paddingLeft:50,
        paddingRight:55
    }
});