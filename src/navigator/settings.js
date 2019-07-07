import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon, Button, Container, Header, Content, Left } from 'native-base';

class SettingsScreen extends Component {
    render() {
        return (
            <View>
                <Container>
                    <Content>
                        <Text>set screen</Text>
                    </Content>
                </Container>
            </View>
        )
    }
}

export default SettingsScreen;