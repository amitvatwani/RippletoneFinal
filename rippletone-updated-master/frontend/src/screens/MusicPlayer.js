import React, { useEffect } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPlaylist,
  listPlayListSongs,
  listSongDetails,
} from '../actions/SongActions';
import FooterMusicPlayer from '../components/FooterMusicPlayer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MusicPlayer = ({ match }) => {
  const dispatch = useDispatch();

  const songDetails = useSelector((state) => state.songDetails);
  const { loading, error, song } = songDetails;
  const songList = useSelector((state) => state.songList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listSongDetails(match.params.id));
    dispatch(listPlayListSongs(userInfo.id));
  }, [dispatch, match]);
  return (
    <>
      <div className='bg-home'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <div className='image-handle'>
              <Image
                src={song.musicPosterUrl}
                alt={song.musicName}
                className='custom-image'
              ></Image>
            </div>

            <Col>
              <h2 className='song-title'>{song.musicName}</h2>
              <p className='song-artist'>{song.musicArtist}</p>
            </Col>
            <Col>
              {songList.songs.map((sone) => sone.musicId) == match.params.id ? (
                <div className='btn-playlist'>
                  <Button variant='success'>Remove from Playlist</Button>
                </div>
              ) : (
                <div className='btn-playlist'>
                  <Button
                    variant='success'
                    onClick={(e) =>
                      e.stopPropagation(dispatch(createPlaylist(song.musicId)))
                    }
                  >
                    Add to Playlist
                  </Button>
                </div>
              )}
            </Col>
          </>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
