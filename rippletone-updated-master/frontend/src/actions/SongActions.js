import axios from 'axios';
import {
  SONG_LIST_REQUEST,
  SONG_LIST_SUCCESS,
  SONG_LIST_FAIL,
  SONG_DETAILS_REQUEST,
  SONG_DETAILS_SUCCESS,
  SONG_DETAILS_FAIL,
  SONG_DELETE_REQUEST,
  SONG_DELETE_SUCCESS,
  SONG_DELETE_FAIL,
  SONG_CREATE_REQUEST,
  SONG_CREATE_SUCCESS,
  SONG_CREATE_FAIL,
  SONG_UPDATE_REQUEST,
  SONG_UPDATE_SUCCESS,
  SONG_UPDATE_FAIL,
  SONG_CREATE_LIKE_REQUEST,
  SONG_CREATE_LIKE_SUCCESS,
  SONG_CREATE_LIKE_FAIL,
  SONG_ADD_TO_PLAYLIST_REQUEST,
  SONG_ADD_TO_PLAYLIST_SUCCESS,
  SONG_ADD_TO_PLAYLIST_FAIL,
} from '../constants/SongConstants';
import { USER_LOGIN_SUCCESS } from '../constants/UserConstants';

export const listSongs =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: SONG_LIST_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const { data } = await axios.get(
        `http://localhost:8080/music%20?keyword=${keyword}`,
        config
      );

      dispatch({
        type: SONG_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SONG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listPlayListSongs = (id) => async (dispatch) => {
  try {
    dispatch({ type: SONG_LIST_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const { data } = await axios.get(
      `http://localhost:8080/playlist/${id}`,
      config
    );

    dispatch({
      type: SONG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SONG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPlaylist = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SONG_ADD_TO_PLAYLIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const { data } = await axios.post(
      `http://localhost:8080/addtoplaylist/${userInfo.id}/${id}`,
      {},
      config
    );

    dispatch({
      type: SONG_ADD_TO_PLAYLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SONG_ADD_TO_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSongDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SONG_DETAILS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/admin/music/${id}`,
      config
    );

    dispatch({
      type: SONG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SONG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSong = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SONG_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    await axios.delete(`http://localhost:8080/admin/music/${id}`, config);

    dispatch({ type: SONG_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: SONG_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSong = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SONG_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const { data } = await axios.post(
      `http://localhost:8080/addmusic`,
      {},
      config
    );

    dispatch({
      type: SONG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SONG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSong = (song) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SONG_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const { data } = await axios.put(
      `http://localhost:8080/admin/music/${song.musicId}`,
      song,
      config
    );

    dispatch({ type: SONG_UPDATE_SUCCESS, payload: data });

    dispatch({ type: SONG_DETAILS_SUCCESS, payload: data });

    // dispatch({ type: SONG_DETAILS_RESET });
  } catch (error) {
    dispatch({
      type: SONG_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createLike = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SONG_CREATE_LIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const { data } = await axios.post(
      `http://localhost:8080/like/${userInfo.id}/${id}`,
      {},
      config
    );

    dispatch({
      type: SONG_CREATE_LIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SONG_CREATE_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
