import React from 'react';

const CurrentPlayingLarge = ({ songname, songimage, songartist }) => {
  return (
    <div className={'CurrentPlayingLarge'}>
      <img className={'banner'} src={songimage} alt='' />
      <div className='music-left'>
        <div className='wrapper'>
          <img className={'music-cover'} src={songimage} alt='' />
          <div className='detail'>
            <h3>{songname}</h3>
            <p>{songartist}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlayingLarge;
