import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listSongDetails, updateSong } from '../actions/SongActions';
import { SONG_UPDATE_RESET } from '../constants/SongConstants';
import axios from 'axios';

const SongEditScreen = ({ match, history }) => {
  const songId = match.params.id;

  const [musicName, setMusicName] = useState('');
  const [musicArtist, setMusicArtist] = useState('');
  const [musicAlbum, setMusicAlbum] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [musicPosterUrl, setMusicPosterUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const songDetails = useSelector((state) => state.songDetails);
  const { loading, error, song } = songDetails;

  const songUpdate = useSelector((state) => state.songUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = songUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SONG_UPDATE_RESET });
      history.push('/admin/songlist');
    } else {
      if (!song.musicName || song.musicId !== songId) {
        dispatch(listSongDetails(songId));
      } else {
        setMusicName(song.musicName);
        setMusicArtist(song.musicArtist);
        setMusicAlbum(song.musicAlbum);
        setMusicUrl(song.musicUrl);
        setMusicPosterUrl(song.musicPosterUrl);
      }
    }
  }, [dispatch, history, songId, song, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSong({
        musicId: songId,
        musicName,
        musicArtist,
        musicAlbum,
        musicUrl,
        musicPosterUrl,
      })
    );
  };

  return (
    <>
      <Link to='/admin/songlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Song</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Song Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Song Name'
                value={musicName}
                onChange={(e) => setMusicName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='artist'>
              <Form.Label>Song Artist</Form.Label>
              <Form.Control
                type='text'
                placeholder='Song Artist'
                value={musicArtist}
                onChange={(e) => setMusicArtist(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='album'>
              <Form.Label>Song Album</Form.Label>
              <Form.Control
                type='text'
                placeholder='Song Album'
                value={musicAlbum}
                onChange={(e) => setMusicAlbum(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='musicurl'>
              <Form.Label>Song URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Song URL'
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='musicposter'>
              <Form.Label>Song Poster</Form.Label>
              <Form.Control
                type='text'
                placeholder='Song Poster'
                value={musicPosterUrl}
                onChange={(e) => setMusicPosterUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='success'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SongEditScreen;
