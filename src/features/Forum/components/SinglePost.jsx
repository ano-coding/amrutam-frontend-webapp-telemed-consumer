// import ForumPostProvider from "../context/ForumPostContext";
import ForumPost from "./ForumPost";
import SearchBar from "./SearchBar";
import ForumPostProvider from "./ForumPostContext";
const SinglePost = () => {
  return (
    <>
      <SearchBar></SearchBar>
      <div className="w-full space-y-10 py-12">
        <ForumPostProvider>
          <ForumPost />
        </ForumPostProvider>
      </div>
    </>
  );
};

export default SinglePost;
