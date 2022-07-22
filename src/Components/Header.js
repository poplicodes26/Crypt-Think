import { AppBar, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const usedStyles = makeStyles(()=>({
    title:{
        color:'gold',
        fontFamily:'Montserrat',
        fontWeight:'bold',
        fontSize:20,
        flex:1,
        cursor:'pointer',
    }
}))

const Header = () => {

  const {currency, setCurrency} = CryptoState()
  
  const classes = usedStyles();
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette:{
        type: 'dark',
    }
  }); 
  console.log(currency);
  
  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Toolbar>
                <Typography onClick = {()=> navigate('/')}  className = {classes.title}>Crypt Think</Typography>
                <Select 
                    variant='outlined' 
                    style={{
                    width:100,
                    height:40,
                    marginLeft:15,
                    }}
                    value={currency}
                    onChange={(e)=> setCurrency(e.target.value)}
                >
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'INR'}>INR</MenuItem>
                </Select>
            </Toolbar>
        </AppBar>
    </ThemeProvider>
  );
  
}

export default Header;