import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import Lists from './screens/Lists';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignupScreen from './screens/SignupScreen';
import SongEditScreen from './screens/SongEditScreen';
import SongListScreen from './screens/SongListScreen';
import UserListScreen from './screens/UserListScreen';
import AdminRoutes from './utils/AdminRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import { useSelector } from 'react-redux';
import FooterMusicPlayer from './components/FooterMusicPlayer';
import MusicPlayer from './screens/MusicPlayer';
import MyPlayListScreen from './screens/MyPlayListScreen';
const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Header />
      <main>
        <div>
          <Route path='/' component={LandingScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/signup' component={SignupScreen} />
          <PrivateRoutes path='/listen' component={HomeScreen} />
          <Route path='/search/:keyword' component={HomeScreen} />
          <PrivateRoutes path='/profile' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/songlist' component={SongListScreen} />
          <Route path='/admin/song/:id/edit' component={SongEditScreen} />
          <Route path='/music/:id/' component={MusicPlayer} />
          <Route path='/playlist' component={MyPlayListScreen} />
        </div>
      </main>
      {userInfo ? <FooterMusicPlayer /> : <Footer />}
    </Router>
  );
};

export default App;
