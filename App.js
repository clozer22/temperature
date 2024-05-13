import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, ImageBackground } from 'react-native';

const CelsiusToFahrenheit = () => {
  const [temperature, setTemperature] = useState('');
  const [isCelsius, setIsCelsius] = useState(true); 

  const [backgroundColor, setBackgroundColor] = useState('white');
  
  const handleTemperatureChange = (value) => {
    setTemperature(value);

    const celsius = parseFloat(value);
    const fahrenheit = celsius * 9/5 + 32;
    if (value === '') {
      setBackgroundColor('blue');
      return;
    }
    if (isCelsius) {
      if (celsius >= 25) {
        setBackgroundColor('#FFA500'); 
      } else if (celsius <= 10) {
        setBackgroundColor('#4169E1'); 
      } else {
        setBackgroundColor('#FFA500');
      }
    } else {
      if (fahrenheit >= 77) {
        setBackgroundColor('#FFA500'); 
      } else if (fahrenheit <= 50) {
        setBackgroundColor('#4169E1');
      } else {
        setBackgroundColor('#4169E1');
      }
    }
  };

  const handleToggleUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
    if (temperature !== '') {
      const currentTemperature = parseFloat(temperature);
      if (isCelsius) {
        const convertedTemperature = currentTemperature * 9/5 + 32;
        setTemperature(convertedTemperature.toFixed(2).toString());
      } else {
        const convertedTemperature = (currentTemperature - 32) * 5/9;
        setTemperature(convertedTemperature.toFixed(2).toString());
      }
    }
  };

  console.log(temperature)

  return (
<ImageBackground
  source={
    temperature !== ''
      ? isCelsius
        ? parseFloat(temperature) <= 10
          ? require('./flakes.png')
          : require('./sun2.png')
        : parseFloat(temperature) <= 50
        ? require('./flakes.png')
        : require('./sun2.png')
      : require('./flakes.png') 
  }
  style={[styles.container, { backgroundColor }]}
>

      <TextInput
        style={styles.input}
        placeholder={isCelsius ? "Enter Celsius temperature" : "Enter Fahrenheit temperature"}
        keyboardType="numeric" 
        value={temperature}
        onChangeText={handleTemperatureChange}
      />
      {temperature !== '' && (
        <Text style={styles.result}>
          {`${temperature}${isCelsius ? '°C' : '°F'} is ${isCelsius ? (parseFloat(temperature) * 9/5 + 32).toFixed(2) : ((parseFloat(temperature) - 32) * 5/9).toFixed(2)}${isCelsius ? '°F' : '°C'}`}
        </Text>
      )}
      <Button
        title={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
        color='black'
        onPress={handleToggleUnit}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
 input: {
  width: 200,
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 20,
  color: 'black',
  backgroundColor: 'rgba(128, 128, 128, 0.3)',
},
  result: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CelsiusToFahrenheit;
