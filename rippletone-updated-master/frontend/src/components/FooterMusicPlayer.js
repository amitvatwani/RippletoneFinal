import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';

const FooterMusicPlayer = () => {
  const dispatch = useDispatch();
  const songDetails = useSelector((state) => state.songDetails);
  const songList = useSelector((state) => state.songList);
  const [musicurl, setmusicurl] = useState('');
  const [musicid, setmusicid] = useState('');
  const { songs } = songList;
  const nextClicked = () => {
    var index =
      (songs.map((song) => song.musicId).indexOf(musicid) + 1) % songs.length;
    setmusicurl(songs[index].musicUrl);
    setmusicid(songs[index].musicId);
  };
  const prevClicked = () => {
    var index =
      (songs.map((song) => song.musicId).indexOf(musicid) - 1) % songs.length;
    if (index - 1 < 0) {
      index = songs.length - 1;
    }
    setmusicurl(songs[index].musicUrl);
    setmusicid(songs[index].musicId);
  };
  console.log(
    '@@@',
    songs.map((song) => song.musicId).indexOf(songDetails.song.musicId)
  );
  useEffect(() => {
    setmusicurl(songDetails.song.musicUrl);
    setmusicid(songDetails.song.musicId);
  }, [songDetails.song.musicid, songDetails.song.musicUrl]);
  return (
    <footer>
      <div className='custom-ms'>
        <AudioPlayer
          autoPlay
          onPlay={(e) => console.log(musicurl)}
          src={musicurl}
          showSkipControls={true}
          showJumpControls={false}
          onClickNext={nextClicked}
          onClickPrevious={prevClicked}
        />
      </div>
    </footer>
  );
};

export default FooterMusicPlayer;
