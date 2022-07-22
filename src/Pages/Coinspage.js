import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import CoinChart from '../Components/CoinChart';
import ReactHtmlParser from 'react-html-parser';
import { numberwithcomma } from '../Components/Banner/Carousel';

const Coinspage = () => {

  // const {id} = useParams;
  const [coin, setCoin] = useState();

  const {currency, symbol} = CryptoState();

  const location = window.location.href;
  const arr = location.split("/"); 
  const id = arr[arr.length-1];

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  console.log(coin);

  useEffect(() => {
    
    fetchCoin();

  }, [])
  
  const usedStyles = makeStyles((theme)=>({
    container:{
        display:"flex",
        [theme.breakpoints.down("md")] :{
          flexDirection:"column",
          alignItems:"center",
        }
    },
    sidebar:{
      width: "30%",
      [theme.breakpoints.down("md")] :{
        width: "100%"
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey"
    },
    heading:{
      fontFamily:"Montserrat",
      fontWeight:800
    },
    desc:{
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 25,
      paddingTop: 0,
      textAlign: "justify"
    },
    marketData:{
      marginBottom: 20
    }
  }))

  const classes = usedStyles();

  if(!coin) return <LinearProgress style={{backgroundColor: "gold"}}></LinearProgress>

  return (

      <div className={classes.container}>
        <div className={classes.sidebar}>
            <img 
              src={coin?.image.large}
              alt = {coin?.name}
              height="200"
              style={{ marginBottom: 20 }}
            />
            <Typography variant="h3" className={classes.heading}>
              {coin?.name}
            </Typography>

            <Typography variant='subtitle1' className={classes.desc} style={{textAlign:"center"}}>
              {ReactHtmlParser(coin?.description.en.split(". ")[0])}
            </Typography>

            <div className={classes.marketData}>
                <span style={{display:"flex"}}>
                  <Typography variant="h5" className={classes.heading}>Rank: </Typography>
                  &nbsp; &nbsp;
                  <Typography variant='h5' style={{fontFamily:"Montserrat"}}>{coin?.market_cap_rank}</Typography>
                </span>
            </div>

            <div className={classes.marketData}>
                <span style={{display:"flex"}}>
                  <Typography variant="h5" className={classes.heading}>Current Price: </Typography>
                  &nbsp; &nbsp;
                  <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
                    {symbol}{" "}
                    {numberwithcomma(coin?.market_data.current_price[currency.toLowerCase()])}
                    </Typography>
                </span>
            </div>

            <div className={classes.marketData}>
                <span style={{display:"flex"}}>
                  <Typography variant="h5" className={classes.heading}>Market Cap: </Typography>
                  &nbsp; &nbsp;
                  <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
                    {symbol}{" "}
                    {
                    numberwithcomma(
                        coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)
                    )
                    }M</Typography>
                </span>
            </div>
        </div>

        <CoinChart coin={coin}></CoinChart>
      </div>
  )
  
}

export default Coinspage;