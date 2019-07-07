import React, {Component} from 'react';
import { StatusBar} from 'react-native';
import { createDrawerNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {Provider} from 'react-redux';

import Notes from './src/notes/Notes';
import NotesUpdate from './src/notes/NotesUpdate';

import Welcome from './src/welcome/Welcome';
import drawer from './src/navigator/drawer';

import store from './src/redux/store';

// Drawer
const AppSwitchNavigatiorA = createDrawerNavigator({
  // welcome: { screen: Welcome },
  // Note: { screen: Notes },
  // NoteUpdate: { screen: NotesUpdate }

  welcome: { screen: Welcome }
}, 
{
    contentComponent: drawer,
    drawerWidth: 250,

    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
    // navigationOptions: {
    //   drawerLockMode: 'locked-closed',
    // }

  drawerPosition: 'left',
  contentOptions: {
    activeTintColor: '#000',
  }
});

// StackNavigator
const AppStackNavigation = createStackNavigator(
{
    welcome: { screen: AppSwitchNavigatiorA },

    // welcome: { screen: Welcome },
    Note: { screen: Notes },
    NoteUpdate: { screen: NotesUpdate }

    // Dashboard: { screen: AppSwitchNavigatiorA }
},
{
  initialRouteName: 'welcome',
  headerMode: 'none'
});



// execute routes
const AppContainer = createAppContainer(AppStackNavigation);

export default class App extends Component
{
  render()
  {
    return(
    <Provider store={store}>
      
      <AppContainer />
    </Provider>
    )
  }
}

// export the class component 
// export default AppContainer;

