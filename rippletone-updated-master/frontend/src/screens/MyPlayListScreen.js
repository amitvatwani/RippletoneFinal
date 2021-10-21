import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { listPlayListSongs, listSongs } from '../actions/SongActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { SongCard } from '../components/SongCard';

const MyPlayListScreen = () => {
  const dispatch = useDispatch();

  const songList = useSelector((state) => state.songList);
  const { loading, error, songs } = songList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    dispatch(listPlayListSongs(userInfo.id));
  }, [dispatch]);
  var hr = new Date().getHours();

  return (
    <>
      <div className='bg-home'>
        <Container>
          <h1 className='greet py-4'>
            {' '}
            {'Good ' +
              (hr < 12 ? 'Morning' : hr < 18 ? 'Afternoon' : 'Evening')}{' '}
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row>
              {songs.map((song) => (
                <Col key={song.id} sm={12} md={6} lg={4} xl={3}>
                  <div>
                    <SongCard song={song} />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default MyPlayListScreen;
