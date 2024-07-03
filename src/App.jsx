import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { darkTheme, lighTheme } from './utils/Theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Error from './pages/Error';
import Signin from './pages/Signin';
import { Toaster } from 'react-hot-toast';
import Search from './pages/Search';
const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.softColor};
  color: ${({ theme }) => theme.text};
  height: 100%;
`;
const Main = styled.div`
  flex: 7;
  display: ${({ responsive }) => (responsive ? 'none' : 'block')};
`;

const Wrapper = styled.div``;
function App() {
  const [darkMode, setdarkMode] = useState(true);
  const [responsive, setResponsive] = useState('');
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lighTheme}>
        <Container>
          <Toaster />
          <BrowserRouter>
            <Menu
              darkMode={darkMode}
              setdarkMode={setdarkMode}
              responsive={responsive}
              setResponsive={setResponsive}
            />
            <Main responsive={responsive}>
              <Navbar responsive={responsive} setResponsive={setResponsive} />
              <Wrapper>
                <Routes>
                  <Route path="/" element={<Home type="random" />} />
                  <Route path="/trends" element={<Home type="trend" />} />
                  <Route path="/subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="/video/:id" element={<Video />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </Wrapper>
            </Main>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
