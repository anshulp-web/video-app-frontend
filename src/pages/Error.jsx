import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div``;

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
`;
const Para = styled.p`
  margin-bottom: 10px;
`;
const Error = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Para>404 No Found</Para>
          <Link to="/">
            <Button>Go Back</Button>
          </Link>
        </Wrapper>
      </Container>
    </>
  );
};

export default Error;
