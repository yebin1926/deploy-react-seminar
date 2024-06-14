import { useState, useEffect } from "react";
import { SmallPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { getPosts, getTags } from "../apis/api";
import { getCookie } from "../utils/cookie";

const HomePage = () => {
  const [postList, setPostList] = useState([]);

  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // 처음 한 번만 실행
  // 작성했던 getPosts()를 호출한 후, setPostList를 통해 postList에 저장
  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();

    // getTags() 이용해서 tag들 불러오고 tags.map을 이용해서 tagContents에
    // tag.content만 저장한 후, tags와 searchTags에 저장
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
      setSearchTags(tagContents);
    };
    getTagsAPI();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    const newTags = tags.filter((tag) => tag.includes(value));
    setSearchTags(newTags);
  };
  const handleTagFilter = (e) => {
    const { innerText } = e.target;
    if (searchValue === innerText.substring(1)) {
      setSearchValue("");
    } else {
      const activeTag = innerText.substring(1);
      setSearchValue(activeTag);
    }
  };
  // 태그를 눌렀을 때는 searchValue만 바뀜

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="w-full mb-16 flex justify-center">
          <h1 className="uppercase text-6xl text-white">my blog</h1>
        </div>
        <input
          type="text"
          placeholder="태그를 검색하세요"
          onChange={handleChange}
          className="border border-orange-400 outline-none rounded-2xl text-center py-2 px-20 text-orange-400 bg-transparent"
        />
      </div>
      <div className="flex mt-5 justify-center">
        {searchTags.map((tag) => {
          return (
            <button
              key={tag}
              className={tag === searchValue ? "tag active mr-2" : "tag mr-2"}
              onClick={handleTagFilter}
            >
              #{tag}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-4 px-10 mt-10">
        {postList
          .filter((post) =>
            searchValue
              ? post.tags.find((tag) => tag.content === searchValue)
              : post
          )
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
      {getCookie("access_token") ? (
        <div className="flex justify-center m-20">
          <Link className="button" to="/create">
            작성
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
