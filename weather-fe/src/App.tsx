import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import HistoryList from './pages/List';
import { AppBar, Toolbar, Typography, Container, Box, Link } from '@mui/material';

const App: React.FC = () => {
  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Weather App
            </Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ marginRight: 2 }}>Main</Link>
              <Link href="/history" color="inherit">History</Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/history" element={<HistoryList />} />
          </Routes>
        </Container>
      </Router>
  );
};

export default App;
