import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'; 

const useStyles = makeStyles( ()=>({
    banner:{
        backgroundImage: "url(./banner2.jpeg)"
    },
    bannercontent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    tagline:{
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
}));

const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannercontent}>
                <div className={classes.tagline}>
                    <Typography variant="h2" style={
                        {
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat"
                        }}>
                        Crypt Think
                    </Typography>
                    <Typography variant="subtitle2" style={
                        {
                            color:"darkgrey",
                            textTransform : "capitalize",
                            fontFamily: "Montserrat"
                        }}>
                        Get All The Information Regarding Your Favourite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner