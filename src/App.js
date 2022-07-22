import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import Coinspage from './Pages/Coinspage'
import { makeStyles, createStyles } from '@material-ui/core/styles';

const usedStyles = makeStyles( ()=> createStyles({
  root:{
    backgroundColor:'#14161a',
    color:'white',
    minHeight: '100vh',
  },
  
}));



function App() {

  const classes = usedStyles();

  return (
    <BrowserRouter>
        <div className={classes.root}>
        <Header />
          <Routes>
              <Route path="/" element={<Homepage/>} exact />
              <Route path="/coins/:id" element={<Coinspage/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
