import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import {Pagination} from '@material-ui/lab'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import {useNavigate} from 'react-router-dom';
import { numberwithcomma } from './Banner/Carousel';

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const {currency, symbol} = CryptoState();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const fetchCoins = async ()=>{
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
      fetchCoins();
    }, [currency]);
    
    const darkTheme = createTheme({
        palette:{
            primary: {
                main: "#fff",
            },
            type: "dark"
        },
    })

    const handleSearch = ()=>{
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )
    }


    console.log(coins);

     const useStyles = makeStyles(()=>({
        row:{
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover":{
                backgroundColor: "#131111"
            },
            fontFamily: "Montserrat"
        },
        pagination:{
            "& .MuiPaginationItem-root":{
                color: "gold"
            }
        }
     }));

     const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign:"center"}}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "montserrat"}}
                >
                    Crypto Currency Price by Market Cap
                </Typography>
                <TextField label="Search for Crypto Currency" variant='outlined'
                    style={{width: "100%", marginBottom: 20}}
                    onChange={(e)=>setSearch(e.target.value)}
                ></TextField>
                <TableContainer>
                    {
                        loading===true?(
                            <LinearProgress style = {{background:"gold" }} />
                        ):(
                            <Table>
                                <TableHead style={{backgroundColor: "#EEBC1D"}}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(
                                            <TableCell
                                                style={{color: "black", fontWeight: "700", fontFamily: "Montserrat"}} 
                                                key={head}
                                                align={head==="Coin"? "left": "right"}
                                            >{head}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>{
                                        
                                        handleSearch().slice((page-1)*10, (page-1)*10+10).map((row) =>{
                                        const profit = row.price_change_percentage_24h > 0;


                                        return(
                                            <TableRow 
                                                onClick={()=>navigate(`/coins/${row.id}`)}
                                                className = {classes.row}
                                                key = {row.name}
                                            >
                                                <TableCell
                                                    component='th'
                                                    
                                                    style={{
                                                        display: "flex",
                                                        gap: 20,
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <img src={row?.image}
                                                        alt = {row.name}
                                                        height = "50"
                                                        style={{ marginBottom: 10}}
                                                    />
                                                    <div
                                                        style={{display: "flex", flexDirection: "column", font: "Montserrat"}}
                                                    >
                                                        <span
                                                            style={{textTransform: "uppercase", fontSize: 22}}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span
                                                            style={{color: "darkgray"}}
                                                        >
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell align="right" style={{ alignItems:"center"}}>
                                                    {symbol}
                                                    {numberwithcomma(row.current_price.toFixed(2) )}
                                                </TableCell>

                                                <TableCell 
                                                align="right"
                                                style={{
                                                    color: profit>0 ? "green" : "red",
                                                    fontWeight: 500
                                                }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>

                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberwithcomma(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    M
                                                </TableCell>

                                            </TableRow>
                                        )
                                        })
                                    

                            }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>

                <Pagination

                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                    
                    classes = {{ul : classes.pagination}}

                    count=  {Number((handleSearch().length/10).toFixed(0))}

                    onChange={(_, value)=>{
                        setPage(value);
                        window.scrollTo({top:450, behavior: 'smooth'})
                    }}
                />

            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable