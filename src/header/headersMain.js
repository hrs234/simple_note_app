import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, Text } from 'react-native';
import {Header, Left, Body, Right, Title, Button, Thumbnail } from 'native-base';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


class Head extends Component
{

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        // logic when hide
        this._menu.hide();
    };

    showMenu = () => {
        // logic when opened
        this._menu.show();
    };

    render()
    {
        return(
            <Header style={{ backgroundColor: '#ffffff' }}>
                <Left>
                    <Button transparent onPress={this.props.fun}>
                        <Thumbnail small source={require('../public/img/indonesia.jpg')} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ textAlign: 'center', marginLeft: 65, color: '#000' }}>NOTE APP</Title>
                </Body>
                <Right>
                    <Menu
                        ref={this.setMenuRef}
                        button={<Icon onPress={this.showMenu} name='sort-amount-desc' size={20} />}
                    >
                        <MenuItem onPress={this.hideMenu}>DESCENDING</MenuItem>
                        <MenuItem onPress={this.hideMenu}>ASCENDING</MenuItem>
                        
                    </Menu>
                </Right>
            </Header>
        )
    }
}

export default Head;