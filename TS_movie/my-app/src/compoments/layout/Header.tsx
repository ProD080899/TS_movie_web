import React from "react";
import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { selectstatusLogin, statusLoginAction } from "../Home/CartMovieSlice";
import { useAppDispatch } from "../../app/hooks";
import { Button, Dropdown, Menu } from "antd";
import { v4 as uuidv4 } from "uuid";
import { emit } from "process";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localstorage = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login") || "{}")
    : {
        success: false,
        user: "none",
      };
  const handleOutLogin = () => {
    dispatch(statusLoginAction({ success: false, user: "" }));
    window.localStorage.setItem(
      "login",
      JSON.stringify({ success: false, user: "" }),
    );

    navigate("/login");
  };
  const handletoHome = () => {
    navigate("/Home");
  };
  const handletoLogin = () => {
    navigate("/login");
  };

  // console.log(11, localstorage.cartmovie.login.success);
  useEffect(() => {
    if (localstorage.success === true) {
      const classSignup = document.querySelector(
        ".Login-Header-SingUp",
      ) as HTMLElement;
      classSignup.style.display = "block";
      const classSignin = document.querySelector(
        ".Login-Header-Singin",
      ) as HTMLElement;
      classSignin.style.display = "none";
      const classIcon = document.querySelector(".user-icon") as HTMLElement;
      classIcon.style.display = "flex";
    } else {
      const classSignup = document.querySelector(
        ".Login-Header-SingUp",
      ) as HTMLLIElement;
      classSignup.style.display = "none";
      const classSignin = document.querySelector(
        ".Login-Header-Singin",
      ) as HTMLElement;
      classSignin.style.display = "block";
      const classIcon = document.querySelector(".user-icon") as HTMLElement;
      classIcon.style.display = "none";
    }
  }, [localstorage.success]);
  function RemoveAccents(str: string) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
  const HandleclicktoMovies = (e: any) => {
    const text = document.querySelectorAll<HTMLButtonElement>(
      ".btn-header-select-movies",
    );
    const url = RemoveAccents(text[e].innerText).split(" ").join("");

    navigate(`/Home/Movies/${url}`);
  };
  const HandleclicktoTvshow = (e: any) => {
    const text = document.querySelectorAll<HTMLButtonElement>(
      ".btn-header-select-tvshow",
    );
    const url = RemoveAccents(text[e].innerText).split(" ").join("");

    navigate(`/Home/${url}`);
  };
  const movies = (
    <Menu
      style={{
        display: "flex",
        flexDirection: "column",
        width: "171px",
      }}
      items={[
        {
          key: uuidv4(),
          label: (
            <button
              className="btn-header-select-movies"
              onClick={() => {
                HandleclicktoMovies(0);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Popular
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              className="btn-header-select-movies"
              onClick={() => {
                HandleclicktoMovies(1);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Now Playing
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              className="btn-header-select-movies"
              onClick={() => {
                HandleclicktoMovies(2);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Upcoming
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              className="btn-header-select-movies"
              onClick={() => {
                HandleclicktoMovies(3);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Top Rate
            </button>
          ),
        },
      ]}
    />
  );
  const tvshow = (
    <Menu
      style={{ display: "flex", flexDirection: "column", width: "171px" }}
      items={[
        {
          key: uuidv4(),
          label: (
            <button
              className="btn-header-select-tvshow"
              onClick={() => {
                HandleclicktoTvshow(0);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Popular
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              className="btn-header-select-tvshow"
              onClick={() => {
                HandleclicktoTvshow(1);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Airing Today
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              className="btn-header-select-tvshow"
              onClick={() => {
                HandleclicktoTvshow(2);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              On TV
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              className="btn-header-select-tvshow"
              onClick={() => {
                HandleclicktoTvshow(3);
              }}
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Top Rate
            </button>
          ),
        },
      ]}
    />
  );
  const people = (
    <Menu
      style={{ display: "flex", flexDirection: "column", width: "171px" }}
      items={[
        {
          key: uuidv4(),
          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Popular People
            </button>
          ),
        },
      ]}
    />
  );
  const more = (
    <Menu
      style={{ display: "flex", flexDirection: "column", width: "171px" }}
      items={[
        {
          key: uuidv4(),
          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Discussions
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Leaderboard
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Support
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Api
            </button>
          ),
        },
      ]}
    />
  );
  const user = (
    <Menu
      style={{ display: "flex", flexDirection: "column", width: "171px" }}
      items={[
        {
          key: uuidv4(),
          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Discussions
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Leaderboard
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Support
            </button>
          ),
        },
        {
          key: uuidv4(),

          label: (
            <button
              style={{
                border: "none",
                background: "no-repeat",
                paddingLeft: "16px",
              }}
            >
              Api
            </button>
          ),
        },
      ]}
    />
  );

  return (
    <div>
      <div className="header-container">
        <div className="header-media">
          <div className="header-left">
            <div className="logo-header" onClick={handletoHome}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="logo the movie"
              />
            </div>
            <div className="Dropdown-group">
              <Dropdown overlay={movies} placement="bottom" arrow>
                <Button>Movies</Button>
              </Dropdown>
              <Dropdown overlay={tvshow} placement="bottom" arrow>
                <Button>TV Shows</Button>
              </Dropdown>
              <Dropdown overlay={people} placement="bottom" arrow>
                <Button> People</Button>
              </Dropdown>
              <Dropdown overlay={more} placement="bottom" arrow>
                <Button> More</Button>
              </Dropdown>
            </div>
          </div>
          <div className="header-right">
            <ul>
              <li>
                <i className="fa-solid fa-plus icon-header"></i>
              </li>
              <li>
                <div className="language-header">
                  <div className="box-item">VI</div>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-bell icon-header"></i>
              </li>
              <li className="user-icon">
                <Dropdown overlay={user} placement="bottom" arrow>
                  <span style={{ zIndex: 999, fontWeight: 600 }}>
                    {localstorage.user[0]}
                  </span>
                </Dropdown>
              </li>
              <li>
                {/* <Link to="/">
                  <div className="Login-Header-Signin">Đăng Nhập</div>
                </Link> */}
                <div className="Login-Header-SingUp" onClick={handleOutLogin}>
                  Đăng Xuất
                </div>
                <div className="Login-Header-Singin" onClick={handletoLogin}>
                  Đăng Nhập
                </div>
              </li>
              <li>
                <i className="fa-solid fa-magnifying-glass icon-header"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
