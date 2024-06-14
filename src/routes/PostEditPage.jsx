import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTags, getPost, updatePost } from "../apis/api";
import { useNavigate } from "react-router-dom";

const PostEditPage = () => {
  const { postId } = useParams();
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [autoCompletes, setAutoCompletes] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
    };
    getTagsAPI();
  }, []);

  // post를 받아와서 넣어주기
  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      const postFormData = {
        ...post,
        tags: post.tags.map((tag) => tag.content),
      };
      setPost(postFormData);
    };
    getPostAPI();
  }, [postId]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };

  const handleTag = (e) => {
    setTagInputValue(e.target.value);
    if (e.target.value) {
      const autoCompleteData = tags.filter((tag) =>
        tag.includes(e.target.value)
      );
      setAutoCompletes(autoCompleteData);
    }
  };

  const handleAutoCompletes = (autoComplete) => {
    const selectedTag = tags.find((tag) => tag === autoComplete);
    if (post.tags.includes(selectedTag)) return;
    setPost({
      ...post,
      tags: [...post.tags, selectedTag],
    });
    setTagInputValue("");
    setAutoCompletes([]);
  };

  const addTag = (e) => {
    e.preventDefault();

    // 입력한 내용이 이미 등록된 태그면 그냥 등록 안됨
    if (post.tags.find((tag) => tag === tagInputValue)) return;

    setPost({
      ...post,
      tags: [...post.tags, tagInputValue],
    });

    setTagInputValue("");
    setAutoCompletes([]);
  };

  const deleteTag = (tag) => {
    setPost({
      ...post,
      tags: post.tags.filter((t) => t !== tag),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(postId, post, navigate);
  };

  return (
    <div className="flex flex-col items-center w-3/5">
      <h3 className="font-bold text-4xl">게시글 수정</h3>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="title" className="label">
          제목
        </label>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          id="title"
          defaultValue={post.title}
          className="input"
          onChange={handleChange}
          required
        />
        <label htmlFor="content" className="label">
          내용
        </label>
        <textarea
          placeholder="내용을 입력하세요"
          id="content"
          defaultValue={post.content}
          cols="30"
          rows="10"
          className="input"
          onChange={handleChange}
          required
        ></textarea>
        <label htmlFor="tags" className="label">
          태그
        </label>
        <div className="flex w-full flex-col">
          <div className="flex  w-full gap-x-5">
            <input
              type="text"
              placeholder="태그를 추가하세요"
              id="tags"
              value={tagInputValue}
              onChange={handleTag}
              className="input grow"
            />
            <button className="small-button w-16" onClick={addTag}>
              추가
            </button>
          </div>
        </div>
        <div className="flex mt-2 bg-black border-gray-500 rounded-2xl w-full">
          {autoCompletes &&
            autoCompletes.map((autoComplete) => (
              <button
                className="tag rounded-2xl text-start border-gray-500 py-2 px-3 text-white focus:bg-gray"
                key={autoComplete}
                onClick={() => handleAutoCompletes(autoComplete)}
              >
                #{autoComplete}
              </button>
            ))}
        </div>
        {post.tags && (
          <div className="flex w-full mt-3 gap-x-1 flew-nowrap">
            {post.tags.map((tag) => (
              <div key={tag} className="flex">
                <span className="tag active m-1 flex flex-row items-center gap-x-2">
                  <p>#{tag}</p>
                </span>
                <button
                  className="after:content-['\00d7'] text-xl"
                  onClick={() => deleteTag(tag)}
                />
              </div>
            ))}
          </div>
        )}
        <button type="submit" onClick={onSubmit} className="button mt-7">
          완료
        </button>
      </form>
    </div>
  );
};

export default PostEditPage;
