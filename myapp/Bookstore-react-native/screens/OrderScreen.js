import React from 'react';
import {View,Text,AsyncStorage,ActivityIndicator, FlatList,
    Image,StyleSheet,TouchableHighlight, DeviceEventEmitter} from 'react-native';
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
        fontSize: 15,
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
    leftContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    rightContainer: {
        flex: 1,
        justifyContent: "flex-end",
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

const GETORDERS_URL=apiUrl+"/getOrders";
export class OrderScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            orders:[],
            isLoading: true,
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
            fetch(GETORDERS_URL, {
                method: 'POST',
                body: formdata,
            })
                .then((response) => response.json())
                .then((responseData) => {
                    // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                    this.setState({
                        isLoading:false,
                        orders: responseData,
                    });
                })
                .catch((error)=> {
                    console.error(error);
                });
        });

    };

    renderOrder=({ item })=>{
        return (
            <TouchableHighlight style={{marginBottom:10,marginTop:10}}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.name}>{item.date}</Text>
                    </View>
                    <View>
                        <FlatList
                            data={item.items}
                            renderItem={({item})=>this.renderItem({item})}
                            style={styles.list}
                            keyExtractor={item => item.name}
                        />
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>¥{item.tot_price}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    renderItem=({ item })=>{
        return (
            <TouchableHighlight style={{marginBottom:10,marginTop:10}}>
                <View style={styles.container}>
                    <View>
                        <View style={styles.leftContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.number}>{item.number}</Text>
                            <Text style={styles.price}>¥{item.prices}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 3,
                    width: "100%",
                    backgroundColor: "red",
                }}
            />
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
                    data={this.state.orders}
                    renderItem={({item})=>this.renderOrder({item})}
                    style={styles.list}
                    keyExtractor={item => item.order_id}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </SafeAreaView>
        );
    }
}
