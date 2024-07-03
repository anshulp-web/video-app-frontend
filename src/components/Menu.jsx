import styled from 'styled-components';
import logoImg from '../img/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  height: 100vh;
  @media (max-width: 768px) {
    display: ${({ responsive }) => (responsive ? 'block' : 'none')};
  }
`;
const Wrapper = styled.div`
  padding: 15px 20px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Img = styled.img`
  height: 35px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  cursor: pointer;
  padding: 5px 5px;
  &:hover {
    background-color: ${({ theme }) => theme.HoverColor};
    border-radius: 10px;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.softBorder};
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;
const Btn = styled.button`
  padding: 8px 20px;
  outline: none;
  border: none;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border: 1px solid #065fd4;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const Title = styled.p`
  font-size: 13px;
  text-align: center;
`;
const LogoWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;
const DensityMediumIconBar = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: inline;
  }
`;
const Menu = ({ darkMode, setdarkMode, responsive, setResponsive }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handlelogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <>
      <Container responsive={responsive}>
        <Wrapper>
          <Logo>
            <Img src={logoImg} />
            <LogoWrapper>
              <div> Video-app</div>
              <DensityMediumIconBar>
                <CloseIcon onClick={() => setResponsive(false)} />
              </DensityMediumIconBar>
            </LogoWrapper>
          </Logo>

          <Link to="/">
            <Item>
              <HomeIcon />
              &nbsp;Home
            </Item>
          </Link>
          <Link to="/trends">
            <Item>
              <ExploreOutlinedIcon />
              &nbsp;Explore
            </Item>
          </Link>
          {user ? (
            <>
              <Link to="/subscriptions">
                <Item>
                  <SubscriptionsOutlinedIcon />
                  &nbsp;Subscriptions
                </Item>
              </Link>
              <Hr />
            </>
          ) : (
            ''
          )}

          <Item>
            <VideoLibraryOutlinedIcon />
            &nbsp;Library
          </Item>
          <Item>
            <HistoryOutlinedIcon />
            &nbsp;History
          </Item>
          <Hr />
          {user ? (
            <Btn onClick={handlelogout}>
              <AccountCircleOutlinedIcon />
              &nbsp;LOGOUT
            </Btn>
          ) : (
            <>
              <Login>
                <Title>Sign in to like,subscribe and comment</Title>
                <Link to="/signin">
                  <Btn>
                    <AccountCircleOutlinedIcon />
                    &nbsp;SIGN IN
                  </Btn>
                </Link>
              </Login>
            </>
          )}
          <Hr />
          <Item>
            <LibraryMusicOutlinedIcon />
            &nbsp;Music
          </Item>
          <Item>
            <SportsBasketballOutlinedIcon />
            &nbsp;Sports
          </Item>
          <Item>
            <SportsEsportsOutlinedIcon />
            &nbsp;Gaming
          </Item>
          <Item>
            <MovieOutlinedIcon />
            &nbsp;Movies
          </Item>
          <Item>
            <ArticleOutlinedIcon />
            &nbsp;News
          </Item>
          <Item>
            <LiveTvOutlinedIcon />
            &nbsp;Live
          </Item>
          <Hr />
          <Item>
            <SettingsOutlinedIcon />
            &nbsp;Settings
          </Item>
          <Item>
            <FlagOutlinedIcon />
            &nbsp;Report
          </Item>
          <Item>
            <HelpOutlineOutlinedIcon />
            &nbsp;Help
          </Item>
          <Item onClick={() => setdarkMode(!darkMode)}>
            <SettingsBrightnessOutlinedIcon />
            &nbsp;{darkMode ? 'Light Mode' : 'Dark Mode'}
          </Item>
        </Wrapper>
      </Container>
    </>
  );
};

export default Menu;
