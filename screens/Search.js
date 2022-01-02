import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Button, TextInput, Card} from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Home from './Home';

const Search = () => {
  const [city, setCity] = useState({name:'',lat:'',lon:'', index:null});
  const [cities, setCities] = useState({});
  const [displayCity, setDisplayCity] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const {navigation} = useNavigation()

  console.log('TTTTTTTTTTTTTTTTTTT',cities);

  const fetchCities = text => {
    console.log('textttttttttttt',text)
    setShowSuggestions(true)
    setCity({...city, name:text});
    fetch(
      `https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`,
    )
      .then(response => response.json())
      .then(data => setCities(data.location))
      .catch(err => console.log(err));
  };

  const selectCity = (item) =>{
    setShowSuggestions(false);
    const index = cities?.address?.indexOf(item);
    console.log('????',index)
    setCity({...city, name:item, index});
    

  }

  const renderItem = ({item}) => {
    return (
      <View>
        <Text style = {styles.area} onPress={()=>selectCity(item)}>{item}</Text>
      </View>
    )
  };

  const onSubmitHandler = () =>{    
const lat = cities?.latitude[city.index];  
const lon = cities?.longitude[city.index];
console.log('pressed', lat, lon);
fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6fc51993377a7d5f77629fd26eca211f`
)
  .then(response => response.json())
  .then(data => setDisplayCity(data))
  .catch(err => console.log(err));

  // navigation.navigate('Home')

  }

  console.log( '>>>>>>>>>>',Object.keys(displayCity).length)
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <TextInput
          label="City"
          value={city.name}
          onChangeText={value => fetchCities(value)}
          theme={{
            colors: {
              primary: 'tomato',
            },
          }}
          keyExtractor={item => item}
        />
        {
          showSuggestions && 
          <FlatList
          data={cities?.address}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
        }
        <Button
          icon="content-save"
          mode="contained"
          color="tomato"
          onPress={onSubmitHandler}>
          <Text style={styles.btn}>Click</Text>
        </Button>
      </View>
      {
        Object.keys(displayCity).length>0 && <Home displayCity = {displayCity}/>
      }
      
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },

  btn: {
    color: '#fff',
    letterSpacing: 3,
  },

  area:{
    paddingVertical:2,
  }
});
