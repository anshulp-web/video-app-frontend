import styled from 'styled-components';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (type == 'sub') {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/videos/${type}`,
            { withCredentials: true }
          );

          if (res && res.data) {
            setVideos(res.data);
          }
        } else {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/videos/${type}`
          );

          if (res && res.data) {
            setVideos(res.data.videos);
          }
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideo();
  }, [type]);

  return (
    <Container>
      {Array.isArray(videos) &&
        videos.map((video) => <Card key={video.id} video={video} />)}
    </Container>
  );
};

export default Home;
