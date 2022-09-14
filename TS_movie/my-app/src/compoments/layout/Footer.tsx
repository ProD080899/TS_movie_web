import React from "react";
import "./Footer.css";
import { useEffect } from "react";

function Footer() {
  const localstorage = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login") || "{}")
    : {
        login: {
          success: false,
          user: "",
        },
      };
  // console.log(success);
  useEffect(() => {
    if (localstorage.success === true) {
      const classUsername = document.querySelector(
        ".username-login",
      ) as HTMLElement;
      classUsername.style.display = "block";
    } else {
      const classUsername = document.querySelector(
        ".username-login",
      ) as HTMLElement;
      classUsername.style.display = "none";
    }
  }, [localstorage.success]);
  return (
    <div>
      <div className="footer-containers">
        <div className="content-footer">
          <div className="item-footer">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              alt=""
              style={{ width: "130px", height: "94px" }}
            />
            <div className="username-login">Hi, {localstorage.user} !</div>
          </div>
          <div className="text1-footer">
            <h1>THE BASICS</h1>
            <ul>
              <li>Giới thiệu về TMDB</li>
              <li>Contact Us</li>
              <li>Support Forums</li>
              <li>API</li>
              <li>System Status</li>
            </ul>
          </div>
          <div className="text1-footer">
            <h1>GET INVOLVED</h1>
            <ul>
              <li>Contribution Bible</li>
              <li>Add New Movie</li>
              <li>Add New TV Show</li>
            </ul>
          </div>
          <div className="text1-footer">
            <h1>COMMUNITY</h1>
            <ul>
              <li>Guidelines</li>
              <li>Discussions</li>
              <li>Leaderboard</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div className="text1-footer">
            <h1>LEGAL</h1>
            <ul>
              <li>Terms of Use</li>
              <li>API Terms of Use</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
