import React, { useState } from "react";
import { Button, Container, Box, FormControl, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';


const API = {
  key: '08ce9bb2f73aeeabab05a43ff7eabe43',
  base: `https://api.openweathermap.org/data/2.5/`
};


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>({});
  const [tempValue, setTempValue] = useState(1);

  const getWeather = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`${API.base}weather?q=${city}&units=metric&APPID=${API.key}`)
      .then((response) => response.json())
      .then((result) => {
        setWeather(result)
        setTempValue(result.main.temp)
        setCity('')
        // console.log(weather)
      });
  };


  return (
    <>
      <Container style={{ margin: '5rem auto' }}>
        <FormControl fullWidth>
          <Box component='form' sx={{
            display: 'flex'
          }}>
            <TextField
              fullWidth
              label='City'
              variant='outlined'
              color='primary'
              placeholder="Enter a City..."
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <Button
              type='submit'
              variant='contained'
              onClick={getWeather}
            >
              <SearchIcon /> Search
            </Button>
          </Box>
        </FormControl>

        {
          typeof weather.main !== "undefined" ? (
              <Card sx={{
                mt: '5rem',
                backgroundColor: '#1E90FF',
                color: '#fff',
                boxShadow: '0 0 5px #1E90FF',
                transition: '.2s ease'
              }}>
                <CardContent>
                  {/* Location */}
                  <Typography variant='h3'>{weather.name}</Typography>

                  {/* Temperature in Celsius/Fahrenheit  */}
                  <Typography variant='h5'>{Math.round(tempValue)}°C / {Math.round(tempValue * 1.8 + 32)}°F</Typography>

                  {/* Condition */}
                  <Typography>{weather.weather[0].main}</Typography>
                  <Typography>({weather.weather[0].description})</Typography>
                </CardContent>
              </Card>
          ) : (
            ""
          )
        }
      </Container>
    </>
  );
}

export default App;
