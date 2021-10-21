import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listSongs, deleteSong, createSong } from '../actions/SongActions';
import { SONG_CREATE_RESET } from '../constants/SongConstants';

const SongListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const songList = useSelector((state) => state.songList);
  const { loading, error, songs } = songList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const songDelete = useSelector((state) => state.songDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = songDelete;

  const songCreate = useSelector((state) => state.songCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    song: createdSong,
  } = songCreate;

  useEffect(() => {
    dispatch({ type: SONG_CREATE_RESET });

    if (!userInfo || !userInfo.role == 'admin') {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/song/${createdSong.musicId}/edit`);
    } else {
      dispatch(listSongs());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdSong]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteSong(id));
    }
  };

  const createSongHandler = () => {
    dispatch(createSong());
  };

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1 className='py-3'>Songs</h1>
        </Col>
        <Col className='text-right'>
          <Button
            className='my-3'
            variant='success'
            onClick={createSongHandler}
          >
            <i className='fas fa-plus'> </i> Upload Song
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.musicId}>
                <td>{song.musicId}</td>
                <td>{song.musicName}</td>
                <td>{song.musicArtist}</td>
                <td>
                  <LinkContainer to={`/admin/song/${song.musicId}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(song.musicId)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SongListScreen;
