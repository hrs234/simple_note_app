import React, {Component} from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import {connect} from 'react-redux';
import { addCategories, showCategories, addNote } from '../redux/action/NotesAction';
import axios from 'axios';


class ModalE extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            category_name: '',
            image: ''
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });

    }

    closeModal = () =>{
        this.props.changeModalVisibility(false);
    }

    _InsertCategory() {

        let randomizer = Math.floor(Math.random() * (364 - 120 + 1)) + 120;


        let data = {
            'id_category': randomizer,
            'category_name': this.state.category_name,
            'image': this.state.image
        }

        this.props.dispatch(addCategories(data));

        this.closeModal();

        
        
    }

    render()
    {
        return(
            <TouchableOpacity onPress={() => this.closeModal()} style={modalContentStyle.container} activeOpacity={3}>
            <TouchableOpacity disabled={true} >
                <View style={[modalContentStyle.modal, {width: this.state.width - 80}]}>
                    <View style={modalContentStyle.textView}>
                        {/* <Text style={[modalContentStyle.text, {fontSize: 20}]}>Modal Header</Text> */}
                            <TextInput
                                style={{ height: 35, width: 250, marginBottom: 38, borderBottomColor: '#000', borderBottomWidth: 2, marginTop: 19 }}
                                onChangeText={(category_name) => this.setState({ category_name })}
                                value={this.state.categoryName}
                                placeholder="Category Name"
                            />
                        <TextInput
                            style={{ height: 35, borderBottomColor: '#000', borderBottomWidth: 2, borderColor: 'gray' }}
                            onChangeText={(image) => this.setState({ image })}
                            value={this.state.categoryURL}
                            placeholder="Image URL"
                        />
                    </View>
                    <View style={modalContentStyle.buttonsView}>
                        <TouchableOpacity onPress={() => this.closeModal()} style={modalContentStyle.TouchableHighlight} underlayColor={'#f1f1f1'}>
                            <Text style={[modalContentStyle.text]}>CANCEL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._InsertCategory()} style={modalContentStyle.TouchableHighlight}>
                            <Text style={[modalContentStyle.text]}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
        )
    }
}

const mapStageToProps = (state) => {
    return{
        insertCategory: state.insertCategory
    }
}

export default connect(mapStageToProps)(ModalE);

const modalContentStyle = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#000',
        opacity: 0.9

    },
    modal:{
        height: 200,
        paddingTop: 10,
        paddingBottom: 17,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 5
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    TouchableHighlight:{
        marginRight: 15,
        padding: 2,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 10,
    },
    textView:{
        flex: 1,
        // alignItems: 'center'
    },
    buttonsView:{
        width: '100%',
        marginLeft: 270,
        flexDirection: 'row',
    }
});