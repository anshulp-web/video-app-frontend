import styled from 'styled-components';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const Button = styled.button`
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
const Comments = ({ videoId }) => {
  const { user } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [desc, Setdesc] = useState('');
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${videoId}`,
        { withCredentials: true }
      );
      setComments(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${videoId}`,
          { withCredentials: true }
        );
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);
  const handleComment = async (e) => {
    if (e.target.value !== '') {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_API_URL}/comments/save`,
      {
        desc,
        videoId,
      },
      { withCredentials: true }
    );
    Setdesc('');
    fetchComments();
  };
  return (
    <Container>
      <NewComment>
        {user.img ? (
          <Avatar src={user.img} />
        ) : (
          <Avatar src="/user-dummy.png" />
        )}
        <Input
          placeholder="Add a comment..."
          onChange={(e) => Setdesc(e.target.value)}
          onInput={handleComment}
        />
        {show ? <Button onClick={handlesubmit}>Submit</Button> : ''}
      </NewComment>
      {Array.isArray(comments) &&
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </Container>
  );
};

export default Comments;
