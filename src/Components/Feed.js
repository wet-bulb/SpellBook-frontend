import React, { useEffect } from "react";
import { useState } from "react";
import ViewPost from "./ViewPost";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";

const getAllPostsAsync = (tavernId, page) => {
  return axios
    .get(`http://localhost:8080/taverns/${tavernId}/posts?page=${page}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("error getting all posts");
    });
};

const Feed = (props) => {
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const updatePosts = () => {
    getAllPostsAsync(props.tavern.id, 0)
      .then((newPage) => {
        setPostData(newPage.content);
        setHasMore(!newPage.last);
        setCurrentPage(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getNextPage = () => {
    getAllPostsAsync(props.tavern.id, currentPage + 1)
      .then((newPage) => {
        setPostData((oldData) => [...oldData, ...newPage.content]);
        setHasMore(!newPage.last);
        setCurrentPage(newPage.pageable.pageNumber);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    updatePosts();
  }, [props.updateDependency]);

  const postComponents = postData.map((post) => {
    return (
      <ViewPost
        key={post.id}
        id={post.id}
        wizard={post.wizard}
        content={post.content}
        timestamp={post.timestamp}
      />
    );
  });

  return (
    <div className="feed">
      <InfiniteScroll
        dataLength={postData.length}
        next={getNextPage}
        hasMore={hasMore}
        loader={
          <div>
            <Skeleton
              sx={{ margin: "20px auto 20px auto", borderRadius: "10px" }}
              variant="rectangular"
              height="150px"
            />
            <Skeleton
              sx={{ margin: "20px auto 20px auto" }}
              variant="rectangular"
              height="150px"
            />
            <Skeleton
              sx={{ margin: "20px auto 20px auto" }}
              variant="rectangular"
              height="150px"
            />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Your scrying mirror comes up empty.</b>
          </p>
        }
        // pull down functionality
        refreshFunction={updatePosts}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h1 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h1>
        }
        releaseToRefreshContent={
          <h1 style={{ textAlign: "center" }}>&#8593; Release to refresh</h1>
        }
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {props.tavern.name}
        </Typography>
        <div>{postComponents}</div>
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
