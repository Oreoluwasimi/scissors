import React from 'react';
import { useState, useEffect } from 'react';
import { ThemeProvider, CircularProgress, Box, Typography } from "@material-ui/core";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from './components/Home';
import Account from "./components/Account";
import theme from './theme';
import { auth } from './firebase';
import LinkRedirect from './components/LinkRedirect';


const App = () => {
  const [user, setUser] = useState(null);
  const {pathname}= useLocation();
  const [initialLoad, setInitialLoad] = useState(pathname === '/' || pathname === '/account' ? true : false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad) return (
    <Box style = {{display: 'flex', justifyContent: 'center', marginLeft: '30px' }}>
        <CircularProgress />
     
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>      
        <Routes>
          <Route path="/" element={user ? <Navigate to="/account" /> : <Home />} />
          <Route path="/account" element={user ? <Account /> : <Navigate to="/" />} />
          <Route path="/:shortCode" element={ <LinkRedirect />}/>
        </Routes> 
    </ThemeProvider>
  );
};

export default App;
