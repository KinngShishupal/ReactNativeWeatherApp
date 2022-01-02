import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';


const Home = ({displayCity}) => {
  const [info, setInfo] = useState({
    name: 'loading',
    temp: 'loading',
    humidity: 'loading',
    desc: 'loading',
    icon: 'loading',
  });

  useEffect(() => {
    setInfo({
        name: displayCity.name,
    temp: getTemp(displayCity.main.temp),
    humidity:displayCity.main.humidity,
    desc: displayCity.weather[0].description,
    icon: displayCity.weather[0].icon,
    })
  }, [displayCity])
// info.main, info.name, info.wind, info.weather[0].icon
  console.log('get data',displayCity)
  const getTemp = (t)=>{
    return (t-273.15).toFixed(2)
  }

  if(info.name === 'loading'){
    return <ActivityIndicator size="large" />
  }
  return (    
    <Card style = {styles.wrapper}>
      
    <Card.Content>
      <Title style = {styles.heading}>{info.name}</Title>
      <Paragraph style = {styles.descr}>{info.desc}</Paragraph>
    </Card.Content>
    <Card.Cover style = {styles.image} source={{ uri: `https://api.openweathermap.org/img/w/${info.icon}.png` }} />
    <Card.Content><Text style = {styles.tempe}>{info.temp} C</Text></Card.Content>
    {/* <Card.Actions>
      <Button>Cancel</Button>
      
      <Button>Ok</Button>
    </Card.Actions> */}
  </Card>
  );
};

export default Home;

const styles = StyleSheet.create({
    wrapper:{
        alignItems:'center',
        backgroundColor:'tomato',
        width:"80%",
        alignSelf:'center',
        marginTop:10,
        borderRadius:10,       

    },
    heading:{
color:'#fff',
fontSize:24,
letterSpacing:2,
alignSelf:'center'
    },
    descr:{
      color:'#fff',
letterSpacing:2,
alignSelf:'center'
    },

    image: {
        width: 66,
        height: 65,
        alignSelf:'center',
        borderRadius:10,
        marginVertical:3

      },

      tempe:{
        color:'#fff',
        letterSpacing:1,
        fontWeight:'bold',
        alignSelf:'center'
      }
})
