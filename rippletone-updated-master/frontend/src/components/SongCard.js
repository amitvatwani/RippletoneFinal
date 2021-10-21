import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listSongDetails } from '../actions/SongActions';
import LikeButton from './LikeButton';

var songurl = '';
const SongCard = ({ song }) => {
  const dispatch = useDispatch();

  const songList = useSelector((state) => state.songList);
  const { loading, error, songs } = songList;
  return (
    <Card className='my-3 rounded cs-card'>
      <Link to={`/music/${song.musicId}`}>
        <Card.Img
          src={song.musicPosterUrl}
          variant='top'
          className='d-block mx-auto image-res rounded'
        />
      </Link>
      <Card.Body>
        <Link to={`/music/${song.musicId}`}>
          <Card.Title as='div' className='text-maxline'>
            <strong className='custom-link'>{song.musicName}</strong>
          </Card.Title>
        </Link>
        <Card.Title as='div' className='text-maxline'>
          <strong className='artist'>Artist: {song.musicArtist}</strong>
        </Card.Title>

        <div className='right'>
          {/* {song.like == null ? (
            <div></div>
          ) : (
            <h1 className='like'>
              <i class='fas fa-heart'></i>
              &nbsp;{song.like.noOfLike}
            </h1>
          )} */}
          <Button
            onClick={(event) =>
              event.stopPropagation(dispatch(listSongDetails(song.musicId)))
            }
            className='cs-btn'
          >
            <i class='fas fa-play'></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export { SongCard };
