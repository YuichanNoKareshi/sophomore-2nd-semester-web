import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from "./utils/history";
import LoginView from './Userview/LoginView'
import SignUpView from './Userview/SignupView'

import HomeView from "./Userview/HomeView";
import MoreView from "./Userview/MoreView";
import AboutView from "./Userview/AboutView";
import CartView from "./Userview/CartView";
import RecordView from "./Userview/RecordView";

import ADHomeView from "./Adminview/ADHomeView";
import ADMoreView from "./Adminview/ADMoreView";
import ADAboutView from "./Adminview/ADAboutView";
import ADCartView from "./Adminview/ADCartView";
import ADRecordView from "./Adminview/ADRecordView";
import AddBookView from "./Adminview/AddBookView";
import EditBookView from "./Adminview/EditBookView";
import UserListView from "./Adminview/UserListView";
import UserOrderView from "./Adminview/UserOrderView";
import SaleListView from "./Adminview/SaleListView";
import FalseView from "./Adminview/FalseView";


class BasicRoute extends React.Component {

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LoginView} />
                    <Route exact path="/signUp" component={SignUpView} />

                    <Route exact path="/home" component={HomeView} />
                    <Route exact path="/more/:id" component={MoreView} />
                    <Route exact path="/about" component={AboutView} />
                    <Route exact path="/cart" component={CartView} />
                    <Route exact path="/record" component={RecordView} />

                    <Route exact path="/ADhome" component={ADHomeView} />
                    <Route exact path="/ADmore/:id" component={ADMoreView} />
                    <Route exact path="/ADabout" component={ADAboutView} />
                    <Route exact path="/ADcart" component={ADCartView} />
                    <Route exact path="/ADrecord" component={ADRecordView} />
                    <Route exact path="/AddBook" component={AddBookView} />
                    <Route exact path="/EditBook/:id" component={EditBookView} />
                    <Route exact path="/UserList" component={UserListView} />
                    <Route exact path="/UserOrder" component={UserOrderView} />
                    <Route exact path="/SaleList" component={SaleListView} />
                    <Route exact path="/False" component={FalseView} />

                    <Redirect from="/*" to="/" />
                </Switch>
            </Router>
        )
    }
}

export default BasicRoute;