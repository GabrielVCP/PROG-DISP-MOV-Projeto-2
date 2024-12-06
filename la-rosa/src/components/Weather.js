import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/styles';  // Estilos do projeto

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=Praia Grande,br&appid=25683151cf3ca5e2c67d6cc02448935e&units=metric&lang=pt_br'
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  if (!weatherData) {
    return <Text>Carregando...</Text>;
  }

  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <View style={styles.weatherContainer}>
      <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
      <Text style={styles.weatherTemperature}>
        {weatherData.main?.temp.toFixed(1)}°C
      </Text>
      <Text style={styles.weatherDescription}>
        {weatherData.weather[0].description}
      </Text>
    </View>
  );
};

export default Weather;
