import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, FlatList, Modal, TouchableHighlight, RefreshControl, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CategoryBtn from '../components/CategoryBtn';
// importing modal contents
import ModalContent from '../components/modal';

import {connect} from 'react-redux';
import { addCategories, showCategories, addNote, selectCategories} from '../redux/action/NotesAction';
import axios from 'axios';




class DrawerStyle extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            dummyData: [
                {
                    id: '1',
                    nameCategory: 'wishlist'
                },
                {
                    id: '2',
                    nameCategory: 'important'
                },
                {
                    id: '3',
                    nameCategory: 'work'
                }
            ],
            // state of modal
            isModalVisible: false,
            refreshing: false
            
        };
        // this.showCategories = this.showCategories;
        
        
    }
    
    
    componentDidMount() 
    {
        this.getCategories();
    }
    
    getCategories() 
    {
        this.props.dispatch(showCategories());
    }

    categoriesSelect(ct='Important')
    {
        this.props.dispatch(selectCategories(null, 'desc', 1, ct));
    }

    
    
    // to cahnging modal visibility
    changeModalVisibility = (bool) => {
        

        this.setState({ isModalVisible: bool });
    }

    _KeyExtractor = (item, index) => item.id_category.toString();
    
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getCategories();
        this.setState({ refreshing: false });
    }

    _onDelete(id)
    {

        Alert.alert('Warning', 'Are you sure want to delete this category', 
        [{
            text: 'No'
        },
        {
            text: 'yes',
            onPress: () => 
            {
                axios.delete(`http://192.168.6.179:4000/categories?id=${id}`)
                    .then(res => {

                        alert('data deleted');

                        this.getCategories();
                    })
                    .catch(error => {
                        alert('data not deleted');
                        console.error('[DATA_DELETE_CATEGORIES] : ' + error);

                    })
            }
        }])

        
    }
    

    render()
    {

        console.log('[LOG BARU.........]' + JSON.stringify(this.props.notes.resultCategories));

        return(
            
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
            <View >
                    <View>
                        <Image source={require('../public/img/indonesia.jpg')} style={drawsStyles.pict}></Image>
                        <Text style={drawsStyles.names}>Harris Santoso</Text>
                            <TouchableOpacity>
                                <View style={drawsStyles.container}>
                                    <Icon name='folder-open' style={drawsStyles.icons} size={20} />
                                
                                    <Text style={drawsStyles.categoryName}>All</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <FlatList
                                data={this.props.notes.resultCategories}
                                keyExtractor={this._KeyExtractor}
                                renderItem={({ item }) => <CategoryBtn categoryName={item.category_name} getEvent={() => this._onDelete(item.id_category.toString())} getEventB={() => this.categoriesSelect(item.category_name)} img={item.image}  />}
                                
                            />
                            
                            <TouchableOpacity onPress={() => this.changeModalVisibility(true)}>
                                <View style={drawsStyles.container}>
                                    <Icon name='plus-circle' style={drawsStyles.icons} size={20} />
                                    <Text style={drawsStyles.categoryName}>Add Category</Text>
                                </View>
                            </TouchableOpacity>
                    </View>
                    
                    

                    

                {/* Modal to open dialog */}
                <View>
                    <Modal visible={this.state.isModalVisible} transparent={true} onRequestClose={() => this.changeModalVisibility(false)} animationType='fade'>
                            <ModalContent changeModalVisibility={this.changeModalVisibility} />
                    </Modal>
                </View>
                

            </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(DrawerStyle)

const drawsStyles = StyleSheet.create({
    container:{
        
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    pict:{
        marginTop: 45,
        marginBottom: 25,
        alignSelf: 'center',
        width: 100, 
        height: 100, 
        borderRadius: 150
    },
    names:{
        alignSelf: 'center',
        fontSize: 25,
        marginBottom: 55
    },
    icons:{
        marginRight: 13,
        marginLeft: 16,
        width: 15,
        height: 15
    },
    categoryName:{
        fontSize: 20
    }
});