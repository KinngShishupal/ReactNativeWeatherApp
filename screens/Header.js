import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Title } from 'react-native-paper';

const Header = () => {
  return (
    <Appbar.Header theme={{
        colors:{
            primary:'#ff3c1a',
            accent:'#fff'
        }
    }} 
    style = {styles.header}
    >
      <Title style = {styles.title}>Fantastic Weather</Title>
    </Appbar.Header>
  );
};

export default Header;


const styles = StyleSheet.create({
    header:{
    flexDirection:'row',
    justifyContent:'center'

    },
    title:{
        color:'#fff',
           
        
    }
})