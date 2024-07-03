import styled from 'styled-components';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Comments from '../components/Comments';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';
import { useEffect, useState } from 'react';
const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 10px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;
const Title = styled.h2`
  font-size: 18px;
  margin-top: 5px;
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.span``;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color: none;
  padding: 10px 10px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;
const Subscribe = styled.button`
  outline: none;
  border: none;
  background-color: none;
  padding: 10px 25px;
  cursor: pointer;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.SubscribeBgColor};
  color: ${({ theme }) => theme.SubscribeColor};
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
const Video = () => {
  const { user } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split('/')[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/find/${
            videoRes.data.video.userId
          }`
        );

        setChannel(channelRes.data.getUser);
        dispatch(fetchSuccess(videoRes.data.video));
      } catch (err) {}
    };
    const updateView = async () => {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/videos/views/${path}`,
          {},
          { withCredentials: true }
        );
      } catch (err) {
        console.error('Failed to update view count', err);
      }
    };
    fetchData();
    updateView();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/users/like/${currentVideo._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(like(user._id));
  };
  const handleDislike = async () => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/users/dislike/${currentVideo._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(dislike(user._id));
  };

  const handleSub = async () => {
    if (user.subscribedUsers.includes(channel._id)) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/unsubscribe/${channel._id}`,
        {},
        { withCredentials: true }
      );
    } else {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/subscribe/${channel._id}`,
        {},
        { withCredentials: true }
      );
    }
    dispatch(subscription(channel._id));
  };

  if (!currentVideo) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          {currentVideo.videoUrl ? (
            <VideoFrame src={currentVideo.videoUrl} controls />
          ) : (
            <div>Loading video...</div>
          )}
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(user?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{' '}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(user?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{' '}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>

        <Channel>
          <ChannelInfo>
            {channel.img ? (
              <Image src={channel.img} />
            ) : (
              <Image src="/user-dummy.png" />
            )}

            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {user ? (
            <>
              <Subscribe onClick={handleSub}>
                {user.subscribedUsers?.includes(channel._id)
                  ? 'SUBSCRIBED'
                  : 'SUBSCRIBE'}
              </Subscribe>
            </>
          ) : (
            <Subscribe>SUBSCRIBE</Subscribe>
          )}
        </Channel>
        {user ? <Comments videoId={currentVideo._id} /> : ''}
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;
