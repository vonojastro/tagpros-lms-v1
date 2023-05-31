import React from "react";
import {Helmet} from "react-helmet"
import blogs from "./blogs";
import Post from "./Post";
import NavBar from '../NavBar'

const Blogs = () => {
    const postId = window.location.pathname.split("/blogs/")
    const post = blogs.map(blog=>blog)
    const posts = post.find(post=>post.id === parseInt(postId[1]))
    

  return (
    <div className="container-fluid">
      {/* <!-- ============================================================== -->
            <!-- Start Page Content -->
            <!-- ============================================================== --> */}

<Helmet>
                <link rel="stylesheet" href="./css/new-age.css" />
            </Helmet>
<NavBar/>

      <div className="container-fluid h-100">
          <div className="row">
 
          <div className="row">
       
              
         
              
              <Post id={posts.id} image={posts.image} title = {posts.title} author = {posts.author} content = {posts.content}/>
              
            
     
  
        </div>
      </div>
    </div>
    </div>
  );
};
export default Blogs;
