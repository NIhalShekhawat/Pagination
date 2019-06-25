import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Post from './componenets/post';
import Pagination from './componenets/pagination';

import './App.css';
import { async } from 'q';

function App() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPost(res.data);
      setLoading(false);
    }
    fetchPosts();
  }, []);


  //Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost)

 //console.log(post)
 const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Post post={currentPosts}loading={loading} />
      <Pagination postPerPage={postPerPage} totalPost={post.length}  paginate={paginate}/>
    </div>
  );
}

export default App;
