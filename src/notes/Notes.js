import React, {Component} from 'react';
import { View, StyleSheet, Text, Picker, FlatList, Alert} from 'react-native';
import { Header, Left, Body, Right, Title, Button, Center, Content, Item, Input, Form,  InputGroup, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import uuid from 'uuid';


import {addNote} from '../redux/action/NotesAction';
import {connect} from 'react-redux';

import Head from '../header/SecondHead';
import { TextInput} from 'react-native-gesture-handler';

class Notes extends Component
{
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
            flatListProps: [],

            redux_save: {
                title: '',
                notes: ''
            }
        }
    }

    componentDidMount()
    {
        axios.get('http://192.168.6.179:4000/categories').then(res => {
            const data = res.data;
            console.log(data.data);
            this.setState({ flatListProps: data.data, loading: false });
        }).catch(error => {
            this.setState({ loading: false, error: 'something went wrong' })
        });
    }

    GetPickerSelectedItemValue = () =>{
        Alert.alert('hello');
    }

    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }

    _executeInsert = () =>
    {
        // before redux
        // axios.post('http://192.168.6.180:4000/notes', 
        // {
        //     // inserting data
        //     title: this.state.title,
        //     note: this.state.notes,
        //     id_category: this.state.PickerValueHolder
        // }).then(res => 
        // { 
        //     // response success
        //     alert('Data Saved'); 
        //     this.props.navigation.navigate('welcome'); 
        // })
        // .catch(error => 
        // { 
        //     // fail response
        //     alert('data unsaved'+error) 
        // });
    
        // if(this.state.title.trim() && this.state.notes.trim())
        // {
        //     console.log('[STATE] title: '+this.state.title);
        //     console.log('[STATE] notes: '+this.state.notes);
        //     this.setState({
        //         title: '',
        //         notes: ''
        //     });
        //     alert('data successfully saved');
        //     this.props.navigation.navigate('welcome');
        // }

        // console.log('[state] : '+this.state.redux_save.title);
        
        // this.props.actions.addNotes(this.state.redux_save);

        // data will sent to redux and recorded in database
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var ss = today.getSeconds();
        var mnt = today.getMinutes();
        var hr = today.getHours();

        // 2019-07-03T15:51:30.000Z

        today = yyyy + '-' + mm + '-' + dd + 'T' + hr + ':' + mnt + ':' + ss;
        
        let randomizer = Math.floor(Math.random() * (364 - 120 + 1)) + 120;


        let data = {
            'id': `${randomizer}`,
            'title': this.state.title,
            'time': today,
            'note': this.state.notes,
            'id_category': this.state.PickerValueHolder
        }

        // logger
        // console.log('[REDUX.....]: '+JSON.stringify(this.props));
        
        // dispatch to addNote action
        this.props.dispatch(addNote(data));

        this.props.navigation.navigate('welcome');
    }

    

    render()
    {
        
        return(
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

                
                <Head backEvent={() => this.props.navigation.navigate('welcome')} namePage='NOTE CREATE' execute={() => this._executeInsert()} />

                    <View>
                        <Form>
                        <Textarea ref={input => {this.Textarea = input}} placeholder="ADD TITLE..." style={{ marginBottom: 35, fontSize: 25, marginLeft: 30 }} onChangeText={(title) => this.setState({ title })}></Textarea>
                        <Textarea placeholder="ADD DESCRIPTION..." style={{ fontSize: 18, marginBottom: 55, width: 220, marginLeft: 30, height: 120 }} onChangeText={(notes) => this.setState({ notes })}></Textarea>
                            <Text style={{marginLeft: 30}}>CATEGORY</Text>
                            <View style={{marginLeft: 30}}>
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

// const mapDispatchToProps = {addNotes};
const mapsStageToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapsStageToProps)(Notes);



