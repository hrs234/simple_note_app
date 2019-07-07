import {createStackNavigator, createAppContainer} from 'react-navigation';

import Notes from './Notes';


const AppNavigator = createStackNavigator({
    Notes: Notes
});

export default createAppContainer(AppNavigator);