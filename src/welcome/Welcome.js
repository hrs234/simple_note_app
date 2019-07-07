import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, FlatList, RefreshControl, ActivityIndicator, Alert} from 'react-native';
import { Content, Fab, Item, Input, Header, Thumbnail, Footer, FooterTab, Left, Body, Right, Title, Container, Card, CardItem, Text, Button, Drawer } from 'native-base';
import axios from 'axios';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import HeaderMain from '../header/headersMain';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../public/styles';
import Box from '../components/NoteListBox';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import lodash from 'lodash'

// Redux
import { connect } from 'react-redux';

// Action Redux
import { showNotes, deleteNote, moreNotes } from '../redux/action/NotesAction';

import lodash from 'lodash';

// Tutor: welcome
class WelcomeScreen extends Component
{

  constructor(props) {
    super(props)
    this.state = {
      active: 'true',

      // Dummy Data
      // flatListProps: [],
      // loading: false,
      // isRefreshing: false,
      search_query: '',
      sort: 'desc',
      page: null,
      maxPage: null,
      currentPage: null
      
      // category: ''
    }


    




    // }).catch(error => {
    //   console.log("ERROR ECCOUNTERED" + error);
    // })

  }

  componentDidMount()
  {
    // stat for checking componentDidMount() is works
    console.log('hi this componentDidMount OK 200');

    

    // getting data from REST API with axios package
    this._FetchData();
    this._reproceed();

    console.log(JSON.stringify(this.props.notes));


    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this._FetchData();
        this._reproceed();

      })
    ]

    // console.log('[HELOOOOOOOOOOOOOOOOO] : ' + JSON.stringify(this.props.notes.data));
    console.log("HOW IT IS CURRENT_PAGE : " + JSON.stringify(this.props.notes));

    // NEW
    // this.limitSearch = lodash.throttle(this._FetchData)
  }

  componentWillUnmount()
  {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  _reproceed = () =>
  {
      axios.get('http://192.168.6.179:4000/notes').then(res => {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log(res);
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");

        this.setState({ maxPage: res.data.total_page, currentPage: res.data.current_page });
    
    })
  }

  // newerrrrrrr

  // index databases
  _KeyExtractor = (item, index) => item.id;

  _handleMore = () => 
  {
    
    let iniate = 1;

    

    if (iniate <= this.props.notes.maxPage)
    {

      iniate = parseInt(this.props.notes.currentPage) + 1;


      this.props.dispatch(moreNotes(this.state.search_query, this.state.sort, iniate));
        // let value_page = this.props.notes.current_page + 1;
      // console.log('Nothing to load :)');
      
    }
    else
    {
      // this.props.dispatch(moreNotes(this.state.search_query, this.state.sort, 1));
      console.log('Nothing to load :)');
    }
  }

  randomColor = (color = '') => 
  {
    let colorLib = ['B3E5FC', 'DCEDC8', 'B0BEC5', 'F0F4C3', 'FFE0B2', 'D1C4E9'];

    let randomizer = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

    let selected;

    if (color == 'Important') {
      selected = '#B3E5FC';
    }
    else if (color == 'Wishlist') {
      selected = '#B0BEC5';
    }
    else if (color == 'siswa') 
    {
      selected = '#DCEDC8';
    }
    else if (color == 'Work') {
      selected = '#F0F4C3';
    }
    else {
      selected = '#D1C4E9';
    }

    // return '#'+colorLib[randomizer];

    return selected;



  } 

  // render the data
  _renderData = ({ item }) => 
  {
    <Box 
    time={item.time} 
    color={this.randomColor(item.category_name)} 
    id_delete={item.id} 
    title={item.title} 
    category={item.category_name} 
    notes={item.note} 
    events={() => this.props.navigation.navigate('NoteUpdate', { id: item.id, title: `${item.title}`, category: `${item.category_name}`, note: `${item.note}` })} 
    />

    // console.log('item.data.time' + item.data.time);

  }


  _FetchData = (s='', st='desc', pg=1) => 
  {
      // axios.get('http://192.168.6.179:4000/notes').then(res => 
      // {
      //   const data = res.data;
      //   console.log(data.data);
      //   this.setState({ flatListProps: data.data, loading: false });
      // }).catch(error => {
      //   this.setState({loading: false, error: 'something went wrong'})
      // });

      // console.log(s);
      
      
      this.props.dispatch(showNotes(s, st, pg));
    
    console.log("**************************************************************");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("RESULT LOCAL STATE MAX_PAGE: " + this.state.maxPage);
    console.log("RESULT LOCAL STATE CURRENT_PAGE: " + this.state.currentPage);
    console.log("");
    console.log("");
    console.log("");
    console.log("***************************************************************");

      console.log('[DATA_LOAD]: '+JSON.stringify(this.props));
  }

  _searchData = (s = '', st = 'desc', pg = 1) =>
  {
    lodash.debounce(this.props.dispatch(showNotes(s, st, pg)), 400);

  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  handleLoadMore = () => {
    if (!this.state.loading) {
      // this.page = this.page + 1;
      
      this._FetchData(); // method for API call 
    }
  };
  
  onRefresh()
  {
    axios.get('http://192.168.6.179:4000/notes').then(res => {
      const data = res.data;
      console.log(data.data);
      this.setState({ flatListProps: data.data, isRefreshing: false });
    }).catch(error => {
      this.setState({ isRefreshing: false, error: 'something went wrong' })
    });
  }

  // V1
  onSearch = (search_query='', sort='no_sort') =>
  {
      if(search_query == '')
      {
        if(sort != 'no_sort')
        {
          axios.get(`http://192.168.6.179:4000/notes?sort=${sort}`).then(res => {

            const data_search = res.data;
            this.setState({ flatListProps: data_search.data });

          }).catch(error => {

            alert('search error');
            console.log('[SEARCH ERROR] : ' + error);

          });  
        }
        else
        {
          this._FetchData()
        }
      }
      else
      {
        if(sort == 'no_sort')
        {
          axios.get(`http://192.168.6.179:4000/notes?search=${search_query}`).then(res => {

            const data_search = res.data;
            this.setState({ flatListProps: data_search.data });

          }).catch(error => {

            alert('search error');
            console.log('[SEARCH ERROR] : ' + error);

          });  
        }
        else
        {
          axios.get(`http://192.168.6.179:4000/notes?search=${search_query}&sort=${sort}`).then(res => {
          
            const data_search = res.data;
            this.setState({ flatListProps: data_search.data });
          
          }).catch(error => {
    
            alert('search error');
            console.log('[SEARCH ERROR] : '+error);
          
          });
        }
      }
  }

// search helper

// event for search typing
  _onlySearch = (search_query) =>
  {
    this.setState({ search_query });
    this._Search(this.state.search_query, this.state.sort, this.state.category);
  }

  // event for sort click
  _onlySort = (sortA) =>
  {
    this.setState({ sort: sortA });
    this._Search(this.state.search_query, this.state.sort, this.state.category);
  }

  // event for categories click
  _onlyCategories = (categoriesA) =>
  {
    this.setState({ category: categoriesA });
    this._Search(this.state.search_query, this.state.sort, this.state.category);
  }

// search main
  _Search = (se='', so='', ct='') =>
  {

    let link = 'http://192.168.6.179:4000/notes';

    if(se != '')
    {

      if(so != '')
      {
        link = `http://192.168.6.179:4000/notes?search=${se}&sort${so}`;
      }
      else if(ct != '')
      {
        // coming soon
        link = `http://192.168.6.179:4000/notes?search=${se}`;
      }
      else
      {
        link = `http://192.168.6.179:4000/notes?search=${se}`;
      }
    }
    else if(so != '')
    {
      if(ct != '')
      {
        // coming soon
        link = `http://192.168.6.179:4000/notes?sort=${so}`;

      }
      else
      {

        link = `http://192.168.6.179:4000/notes?sort=${so}`;
      }
    }
    else if(ct != '')
    {
      // coming soon
      if(se != '')
      {
        link = `http://192.168.6.179:4000/notes?search=${se}`;
      }
      else
      {
        link = `http://192.168.6.179:4000/notes?search=${se}`;
      }
    }
    else if(ct != '' && so != '' && se != '')
    {
      // coming soon
      link = `http://192.168.6.179:4000/notes?search=${se}&sort=${so}`;
    }
    

    axios.get(link).then(res => {

      const data_search = res.data;
      this.setState({ flatListProps: data_search.data });
      console.log(link);
    }).catch(error => {

      alert('search error');
      console.log('[SEARCH ERROR] : ' + error);

    });
    
  }

  // MENU ASC DSC
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  DeleteData = (id) => 
  {

    Alert.alert('Warning', 'are ypu sure want delete this data',[
      {
        text: 'No'
      },
      {
        text: 'Yes',
        onPress: () => {
          this.props.dispatch(deleteNote(id));

          this._FetchData();
          
        }
      }
    ])

  }

  hideMenuDSC = () => {
    // logic when hide
    // this._onlySort('desc');
    // this._onlySort('desc');

    this._FetchData(this.state.search_query, 'desc');

    this._menu.hide();
  };

  hideMenuASC = () =>{
    // logic when hide
    // this._onlySort('asc');
    // this._onlySort('asc');

    this._FetchData(this.state.search_query, 'asc');

    this._menu.hide();
  }

  showMenu = () => {
    // logic when opened
    this._menu.show();
  };
  
  render()
  {
    // console.log('this.props.notes.isError : ' + this.props.notes.isError);
    console.log('this.props.notes.data : ' + JSON.stringify(this.props.notes.result));
    


      if(this.state.loading)
      {
        return <View style={{width: '100%', height: '100%'}}>
          <ActivityIndicator style={{color: '#000'}} />
        </View>
      }
      return(
          <Container>
            {/* <HeaderMain fun={() => this.props.navigation.openDrawer()} /> */}

          {/* onPress={this.props.navigation.openDrawer()} */}

          {/* header */}
          <Header style={{ backgroundColor: '#ffffff' }}>
            <Left>
              <Button transparent >
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
                <MenuItem onPress={this.hideMenuDSC}>DESCENDING</MenuItem>
                <MenuItem onPress={this.hideMenuASC}>ASCENDING</MenuItem>

              </Menu>
            </Right>
          </Header>
          {/* end header */}

          {/* onSubmitEditing={() => this._FetchData(this.state.search_query) } */}

          <Item rounded style={{ marginTop: 80, width: 300, marginLeft: 32, position: 'absolute', backgroundColor: '#fff', zIndex: 1 }}>
            <Input placeholder='Search...' onSubmitEditing={() => this._FetchData(this.state.search_query)} 
              onChangeText={(search_query) => this.setState({ search_query })} />
            {/* onChangeText={(search) => this._onlySearch(search)} */}
            {/* this._FetchData(search) */}
          </Item>

          <Content refreshControl={
            <RefreshControl refreshing={this.props.notes.isLoading || this.props.notes.isLoadingFoot} onRefresh={this._FetchData} />
          }>
                  {
                    this.props.notes.isLoading ?
                    <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 100 }}  />
                    : this.props.notes.isError ?
                    <Text style={{ marginTop: 80, marginLeft: 35 }}>Problem ecountered</Text> :
                    (
                      <FlatList
                        style={{ marginTop: 80 }}
                      data={this.props.notes.result}
                        numColumns={2}
                        keyExtractor={this._KeyExtractor}
                      
                      renderItem={({ item }) => 
                      {
                        return(
                          <Box
                          time={item.time}
                          color={this.randomColor(item.category_name)}
                          id_delete={item.id}
                          title={item.title}
                          deleteEvent={() => this.DeleteData(item.id)}
                          category={item.category_name}
                          notes={item.note}
                          events={() => this.props.navigation.navigate('NoteUpdate', { id: item.id, title: `${item.title}`, category: `${item.category_name}`, note: `${item.note}` })}
                        />
                        )
                        
                      }}
                        // refreshControl={
                        //   <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
                        // }
                        // {({ item }) =>

                        // <Box time={item.time} color={randomColor(item.category_name)} id_delete={item.id} title={item.title} category={item.category_name} notes={item.note} events={() => this.props.navigation.navigate('NoteUpdate', {id: item.id, title: `${item.title}`, category: `${item.category_name}`, note: `${item.note}`})} />




                        onEndReachedThreshold={0.1}
                        onEndReached={() => this._handleMore()}


                      />
                    )
                  }
                  
            {/* onEndReached={this.handleLoadMore.bind(this)} */}
            
            {
              this.props.notes.isLoadingFoot == true
              ? 
              <ActivityIndicator size="small" color="#00ff00" style={{ marginTop: 15 }} />
              : null
            }

        </Content>
        <Fab

          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#fff' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('Note')}
        >
          <Icon name="plus" style={{ color: '#000' }} />

        </Fab>




      </Container>

    )

  }
}

const mapStateToProps = state => 
{
  return {
    notes: state.notes
  }
}

export default connect(mapStateToProps)(WelcomeScreen);