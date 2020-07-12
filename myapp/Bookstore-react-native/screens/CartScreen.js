import React from 'react';
import {View,Text,AsyncStorage,ActivityIndicator, FlatList, Image,StyleSheet,TouchableHighlight, DeviceEventEmitter} from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import {apiUrl} from '../urlconfig';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    name: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    price: {
        fontSize:10,
        textAlign: 'center',
    },
    number: {
        fontSize:10,
        textAlign: 'center',
    },
    rightContainer: {
        flex: 3,
        paddingRight:10,
    },
    image: {
        width: 53,
        height: 81
    },
    list: {
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: '#F5FCFF',
    },
});

const GETLIKES_URL=apiUrl+"/getLikes";
const SAVEORDER_URL=apiUrl+"/saveOrder";
export class CartScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            books:[],
            showBooks:[],
            prices:[],
            isLoading: true,
            all_price0:'',
            all_price:' ￥',
        }
    }

    componentDidMount(){
        this.fetchData();
        this.deEmitter = DeviceEventEmitter.addListener('likes', () => {
            this.fetchData();
        });

    }

    fetchData=()=> {
        let formdata = new FormData();
        AsyncStorage.getItem('user').then((result)=>
        {
            formdata.append('username',result);
            fetch(GETLIKES_URL, {
                method: 'POST',
                body: formdata,
            })
                .then((response) => response.json())
                .then((responseData) => {
                    // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                    let a_price=0;
                    let prices=new Array();
                    for (let i=0;i<responseData.length;i++)
                    {
                        a_price += responseData[i].tot_price;
                        prices[i]=responseData[i].tot_price/responseData[i].tot_number;
                    }
                    this.setState({
                        isLoading:false,
                        books: responseData,
                        showBooks:responseData,
                        prices:prices,
                        all_price0:a_price,
                        all_price:a_price+" ￥",
                    });
                })
                .catch((error)=> {
                    console.error(error);
                });
        });

    };

    handleSub=(id)=>{
        let books=this.state.books;
        let index=0;
        for (index=0;index<books.length;index++)
            if (books[index].book_id === id) break;

        if (books[index].tot_number===0) return;

        let a_price0=this.state.all_price0;
        books[index].tot_number--;
        books[index].tot_price -= this.state.prices[index];
        a_price0-= this.state.prices[index];
        let a_price=a_price0+' ￥';

        this.setState({
            books:books,
            all_price0:a_price0,
            all_price:a_price,
        });
    };

    handleAdd=(id)=>{
        let books=this.state.books;
        let index=0;
        for (index=0;index<books.length;index++)
            if (books[index].book_id === id) break;

        let a_price0=this.state.all_price0;
        books[index].tot_number++;
        books[index].tot_price += this.state.prices[index];
        a_price0+= this.state.prices[index];
        let a_price = a_price0+' ￥';

        this.setState({
            books:books,
            all_price0:a_price0,
            all_price:a_price,
        });
    };

    onConfirm=()=>{
        let formdata = new FormData();
        AsyncStorage.getItem('user').then((result)=>
        {
            let book_ids=new Array();
            let book_nums=new Array();
            for (let i=0;i<this.state.books.length;i++)
            {
                book_ids[i]=this.state.books[i].book_id;
                book_nums[i]=this.state.books[i].tot_number;
            }
            console.log(book_ids);
            console.log(book_nums);
            let d=new Date();
            let year=d.getFullYear();
            let month=d.getMonth()+1;
            if (month < 10) month='0'+month;
            let day=d.getDate();
            if (day < 10) day='0'+day;
            let date=year+'-'+month+'-'+day;

            formdata.append('username',result);
            formdata.append('date',date);
            formdata.append('price',this.state.all_price0);
            formdata.append('book_ids',book_ids.toString());
            formdata.append('book_nums',book_nums.toString());
            fetch(SAVEORDER_URL, {
                method: 'POST',
                body: formdata,
            })
                .then(
                    () =>DeviceEventEmitter.emit('likes', 'add likes')
                )
                .catch((error)=> {
                    console.error(error);
                });
        });
    };

    renderBook=({ item })=>{
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <TouchableHighlight style={{marginBottom:10,marginTop:10}}>
                <View style={styles.container}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{item.book_name}</Text>
                        <View>
                            <Text style={styles.number}>{item.tot_number}</Text>
                            <Text style={styles.price}>¥{item.tot_price}</Text>
                        </View>
                    </View>

                    <Button title="-" onPress={()=>this.handleSub(item.book_id)} />
                    <Button title=" " type="clear" disabled={true}/>
                    <Button title="+" onPress={()=>this.handleAdd(item.book_id)} />
                </View>
            </TouchableHighlight>
        );
    };

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <SafeAreaView style={{ flex: 2}}>
                <FlatList
                    data={this.state.showBooks}
                    renderItem={this.renderBook}
                    style={styles.list}
                    keyExtractor={item => item.bookId}
                />
                <Button title={this.state.all_price} onPress={this.onConfirm} />
            </SafeAreaView>
        );
    }
}
