import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker, FlatList, Alert } from 'react-native';
import { Header, Left, Body, Right, Title, Button, Center, Content, Item, Input, Form, InputGroup, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import Head from '../header/SecondHead';
import { TextInput } from 'react-native-gesture-handler';

import uuid from 'uuid';
import {connect} from 'react-redux';
import {updateNote} from '../redux/action/NotesAction';

class NotesUpdate extends Component {
    constructor(props) {
        super(props);



        this.state = {
            selectedItem: undefined,
            title: '',
            notes: '',
            selected1: 'key1',
            isLoading: true,
            PickerValueHolder: '',
            results: {
                items: []
            },
            flatListProps: []
        }


        console.log('this constructor');

        console.log('title: '+this.state.title);
        console.log('notes: '+this.state.notes);

    }

    componentDidMount() {
        // load categories from database
        axios.get('http://192.168.6.179:4000/categories').then(res => {
            const data = res.data;
            console.log(data.data);
            this.setState({ flatListProps: data.data, loading: false });
        }).catch(error => {
            this.setState({ loading: false, error: 'something went wrong' })
        });

        console.log('check');
        // const { navigation } = this.props;


        
        // this.subs = [
        //     this.props.navigation.addListener('willFocus', () => {
        //         console.log('NotesUpdate in rendering...');
        //         this.setState({ title: navigation.getParam })
        //     })
        // ]


    }

    

    GetPickerSelectedItemValue = () => {
        Alert.alert('hello');
    }

    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }


    // this.setState({ selected1: `${navigation.getParam('category', 'wishlist').toString()}` });


    _executeInsert = (id) => {


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var ss = today.getSeconds();
        var mnt = today.getMinutes();
        var hr = today.getHours();

        // 2019-07-03T15:51:30.000Z

        today = yyyy + '-' + mm + '-' + dd + 'T' + hr + ':' + mnt + ':' + ss;


        let data = {
            'id': uuid(),
            'title': this.state.title,
            'time': today,
            'note': this.state.notes,
            'id_category': this.state.PickerValueHolder
        }
        
        this.props.dispatch(updateNote(id, data));

        this.props.navigation.navigate('welcome');
        
        // axios.put(`http://192.168.6.179:4000/notes?id=${id}`, {
        //     title: this.state.title,
        //     note: this.state.notes,
        //     id_category: this.state.PickerValueHolder
        // }).then(res => 
        // {
        //     // the logic when data successfully added 
        //     alert('Data Updated : ' + id); 
        // }).catch(error => { alert('data unsaved' + error) });
    }

    render() {
        
        const { navigation } = this.props;

        let id_category = navigation.getParam('id', '0');
        // const 
        return (
            <View>


                {/* <Header style={{ marginBottom: 55, backgroundColor: '#fff' }}>
                    <Left>
                        <Button transparent >
                            <Text onPress={() => this.props.navigation.navigate('welcome')}>
                                <Icon name='arrow-left' size={25} />

                            </Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ textAlign: 'center', marginLeft: 35, color: '#000' }}> NOTE CREATE</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='check-circle-o' size={25} />
                        </Button>
                    </Right>
                </Header> */}


                <Head backEvent={() => this.props.navigation.navigate('welcome')} namePage='NOTE UPDATE' execute={() => this._executeInsert(id_category)} />

                <View>
                    <Form>
                        {/* navigation.getParam('note', 'no data').toString() */}
                        <Textarea defaultValue={navigation.getParam('title', 'no data').toString()} placeholder="ADD TITLE..." style={{ marginBottom: 35, fontSize: 25, marginLeft: 30 }} onChangeText={(title) => this.setState({ title })}></Textarea>
                        <Textarea defaultValue={navigation.getParam('note', 'no data').toString()} placeholder="ADD DESCRIPTION..." style={{ fontSize: 18, marginBottom: 55, width: 220, marginLeft: 30, height: 120 }} onChangeText={(notes) => this.setState({ notes })}></Textarea>
                        <Text style={{ marginLeft: 30 }}>CATEGORY</Text>
                        <View style={{ marginLeft: 30 }}>
                            {/* <Picker
                            
                                headerComponent={
                                    <Header>
                                        <Button transparent>
                                            Custom Back
                                    </Button>
                                        <Title>Custom Header</Title>
                                    </Header>
                                }
                                mode='dropdown'
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)}
                                style={{ width: 200 }}
                                >
                                    
                                    
                                    
                                    
                                    <Item label='Elephants' value='key3' />
                                </Picker> */}

                            <Picker
                                selectedValue={this.state.PickerValueHolder}

                                onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })} >

                                {this.state.flatListProps.map((item, key) => (
                                    <Picker.Item label={item.category_name} value={item.id_category} key={key} />)
                                )}

                            </Picker>

                        </View>
                    </Form>
                </View>

            </View>
        )
    }
}

const mapDispatchToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapDispatchToProps)(NotesUpdate);



const Style = StyleSheet.create(
    {
        Teks: {
            color: 'blue',

        }
    });