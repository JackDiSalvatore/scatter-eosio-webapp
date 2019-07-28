import React, { Component } from 'react';
import {connect } from 'react-redux';

import {
    requestLogin,
    fetchWallet,
    logout,
    sendTokens
} from '../../scatter/scatter_actions';

//import UserWallet from "../../components/user_wallet";
//import SendTokens from "../../components/send_tokens";
//import UserAccount from "../../components/user_account";

import Button from '@material-ui/core/Button';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            scatterConnected: false,
            requestedAuth: false,
            connectingScatter: false,
            requestedTransaction: false,
            connectedNetworkName: null,

            // account details
            loggedIn: false,
            userAccount: {
                name: null,
                publicKey: null,
                keyType: null,
            },
            userWallet: {}
        };

    };

    loginUser = () => this.props.dispatch(requestLogin());

    static getDerivedStateFromProps(props){
        const
            hasWalletOrError = props.scatter.userWallet || props.scatter.walletError,
            shouldFetchWallet = props.scatter.loggedIn && !(hasWalletOrError || props.scatter.fetchingWallet);

        shouldFetchWallet && props.dispatch(fetchWallet());
        return null;
    }

    sendTokens = ({toAccount,amount,memo}) => {
        this.props.dispatch(sendTokens({toAccount,amount,memo}))
    };

    logOutUser = ()=> this.props.dispatch(logout());

    render(){
        const { userAccount, loggedIn, userWallet} = this.props.scatter;

        const {
            loginUser,
            sendTokens,
            logOutUser
        } = this;

        return (
            <div id="homepage">
                
                    
              <div>
                  {loggedIn ? <Button onClick={logOutUser}>Log out</Button> : <Button onClick={loginUser}>Log in</Button>}
              </div>
                    
            
            </div>
        );
    }
}

const mapStateToProps = ({scatter}) => {
    return {
        scatter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
