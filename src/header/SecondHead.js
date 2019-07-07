import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, Text } from 'react-native';
import { Header, Left,  Body, Right, Title, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class SecondHead extends Component {
    render() {
        return (
            <Header style={{ marginBottom: 55, backgroundColor: '#fff' }}>
                <Left>
                    <Button transparent >
                        <Text onPress={this.props.backEvent}>
                            <Icon name='arrow-left' size={25} />

                        </Text>
                        {/* <Image source={require('./src/pict/indonesia.jpg')} Style={{ width: 5, height: 1 }} /> */}
                    </Button>
                </Left>
                <Body>
                    <Title style={{ textAlign: 'center', marginLeft: 35, color: '#000' }}> {this.props.namePage}</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>
                            <Icon name='check-circle-o' size={25} onPress={this.props.execute} />
                        </Text>
                    </Button>
                </Right>
            </Header>
        )
    }
}

export default SecondHead;