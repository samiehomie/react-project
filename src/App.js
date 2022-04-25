import { Route, Routes } from 'react-router-dom';
import NavbarInPost from './components/NavbarInPost';
import BlogContainer from './containers/BlogContainer';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NavbarInPost />}>
        <Route index element={<BlogContainer />} />
        <Route path=':postId' element={<BlogContainer />} />
      </Route>
    </Routes>
  );
};

export default App;