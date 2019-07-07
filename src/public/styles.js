import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    headBgColor: {
        backgroundColor: '#B4C1CB'
    },
    container: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        backgroundColor: '#DEDEDE',
        height: 150,
        margin: 15,
        width: 150,
        borderRadius: 15
    },
    Headings: {
        textAlign: 'right',
        fontSize: 15,
        paddingTop: 12,
        paddingRight: 18

    },
    Title: {
        fontSize: 18,
        paddingTop: 5,
        paddingLeft: 10
    },
    Category: {
        fontSize: 12,
        paddingTop: 3,
        paddingLeft: 10
    },
    Notes: {
        fontSize: 15,
        paddingTop: 10,
        paddingLeft: 10
    }
});

export default styles;