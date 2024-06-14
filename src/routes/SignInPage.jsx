import { useState } from "react";
import { signIn } from "../apis/api";

const SignInPage = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const handleSignInData = (e) => {
    const { id, value } = e.target;
    setSignInData({ ...signInData, [id]: value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault(); // to prevent reloading the page
    signIn(signInData);
  };

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-2xl">로그인</h3>
      <form className="form gap-2" onSubmit={handleSignInSubmit}>
        <label htmlFor="username" className="label">
          *유저 이름:
        </label>
        <input
          required
          type="text"
          id="username"
          className="input"
          value={signInData.username}
          onChange={handleSignInData}
        />

        <label htmlFor="password" className="label">
          *비밀번호:
        </label>
        <input
          required
          type="password"
          id="password"
          className="input"
          value={signInData.password}
          onChange={handleSignInData}
        />

        <div className="flex flex-row items-center gap-5">
          <button type="reset" className="button mt-7">
            초기화
          </button>
          <button type="submit" className="button mt-7">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
