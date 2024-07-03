import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Container = styled.div`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  padding: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
  background-color: #999;
`;
const Detailed = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
  gap: 12px;
`;
const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-color: #999;
  background-color: #999;
`;
const Texts = styled.div`
  color: ${({ theme }) => theme.text};
`;
const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 5px;
`;
const ChannelName = styled.h3`
  font-size: 14px;
  margin-bottom: 5px;
`;
const Info = styled.div`
  font-size: 14px;
`;
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/find/${video.userId}`
      );
      setChannel(res.data.getUser);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <>
      <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
        <Container type={type}>
          <Image type={type} src={video.imgUrl} />
          <Detailed>
            {channel.img ? (
              <ChannelImg type={type} src={channel.img} />
            ) : (
              <ChannelImg type={type} src="/user-dummy.png" />
            )}

            <Texts>
              <Title>{video.title}</Title>
              <ChannelName>{channel.name}</ChannelName>
              <Info>
                {video.views} views • {format(video.createdAt)}
              </Info>
            </Texts>
          </Detailed>
        </Container>
      </Link>
    </>
  );
};

export default Card;
