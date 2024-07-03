import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Upload from './Upload';
import { useEffect, useRef, useState } from 'react';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 18px;
  @media (max-width: 768px) {
    position: relative;
    width: 58%;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;

  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const DensityMediumIconBar = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: inline;
  }
`;
const Navbar = ({ responsive, setResponsive }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { user } = useSelector((state) => state.user);

  const handleSearch = (e) => {
    setQ(e.target.value);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <DensityMediumIconBar>
            <DensityMediumIcon
              style={{ cursor: 'pointer' }}
              onClick={() => setResponsive(true)}
            />
          </DensityMediumIconBar>

          <Search>
            <Input placeholder="Search" value={q} onChange={handleSearch} />
            <SearchOutlinedIcon
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/search?q=${q}`)}
            />
          </Search>
          {user ? (
            <User>
              <VideoCallOutlinedIcon
                style={{ cursor: 'pointer' }}
                onClick={() => setOpen(true)}
              />
              {user.img ? (
                <Avatar src={user.img} />
              ) : (
                <Avatar src="/user-dummy.png" />
              )}

              {user.name}
            </User>
          ) : (
            <Link to="/signin">
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
