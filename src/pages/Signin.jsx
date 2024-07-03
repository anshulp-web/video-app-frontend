import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
  text-align: center;
  box-shadow: 2px 1px 15px 3px #8080807d;
  width: 300px;
  height: 500px;
  padding: 5px;
  margin-bottom: 10px;
  position: relative;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border: none;
  outline: none;
  border: 1px solid #8080807d;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) => theme.text};
  }
`;

const SigninButton = styled.button`
  border: none;
  outline: none;
  padding: 10px 10px;
  width: 100px;
  margin: 5px auto;
  cursor: pointer;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  background-color: transparent;
`;
const GoogleButton = styled.button`
  border: none;
  outline: none;
  padding: 10px 10px;
  width: 200px;
  margin: 5px auto;
  cursor: pointer;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  background-color: transparent;
`;

const SigninText = styled.h2`
  margin: 5px 5px;
`;

const Signinp = styled.p`
  font-size: 14px;
  margin: 5px 5px;
`;

const FormInfo = styled.div`
  position: absolute;
  bottom: 13%;
  display: flex;
  justify-content: space-between;
  width: 300px;
  font-size: 13px;
`;

const Signin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [spassword, setSpassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        { name, password },
        { withCredentials: true }
      );

      if (response.data) {
        toast.success('Logged In');

        dispatch(loginSuccess(response.data.userData));
        navigate('/');
      }
    } catch (error) {
      toast.error('Something went wrong');
      dispatch(loginFailure(loginFailure(error)));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { name: sname, email, password: spassword }
      );
      if (res.data) {
        toast.success('Signup done');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/auth/google`,
            {
              name: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
            },
            { withCredentials: true }
          )
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate('/');
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };
  return (
    <Container>
      <Wrapper>
        <SigninText>Signin</SigninText>
        <Signinp>To like, subscribe, and comment</Signinp>
        <form onSubmit={handleLogin}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <SigninButton type="submit">Signin</SigninButton>
          </InputGroup>
        </form>
        <p>or</p>
        <GoogleButton onClick={signInWithGoogle}>
          Signin with Google
        </GoogleButton>
        <form onSubmit={handleSignup}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Username"
              value={sname}
              onChange={(e) => setSname(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={spassword}
              onChange={(e) => setSpassword(e.target.value)}
              required
            />
            <SigninButton type="submit">Signup</SigninButton>
          </InputGroup>
        </form>
      </Wrapper>
      <FormInfo>
        <Link to="#">Language (Uk)</Link>
        <Link to="#">Privacy</Link>
        <Link to="#">Help</Link>
        <Link to="#">Policy</Link>
      </FormInfo>
    </Container>
  );
};

export default Signin;
