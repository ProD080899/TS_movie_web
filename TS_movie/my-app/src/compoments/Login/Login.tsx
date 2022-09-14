import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import LinearProgress from "@mui/material/LinearProgress";

import {
  fetchDataLoading,
  fetchDataSuccess,
  selectLoading,
  statusLoginAction,
} from "../Home/CartMovieSlice";

function Login() {
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const handleClickLogin = () => {
    const idUsername = document.querySelector("#username") as HTMLLIElement;
    const username = idUsername.value;
    const idPassword = document.querySelector("#password") as HTMLLIElement;
    const password = idPassword.value;
    dispatch(fetchDataLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/authentication/token/new?api_key=8827c7821b4ab2b478d40e975b4bcd60",
      )
      .then((data) => {
        console.log(79, data.data);
        axios
          .post(
            `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
            {
              username: username,
              password: password,
              request_token: data.data.request_token,
            },
          )
          .then((data) => {
            console.log(95, data.data);

            axios
              .post(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
                {
                  request_token: data.data.request_token,
                },
              )
              .then((data) => {
                console.log(110, data.data);
                Navigate("/Home");
                dispatch(statusLoginAction({ success: true, user: username }));
                window.localStorage.setItem(
                  "login",
                  JSON.stringify({ success: true, user: username }),
                );
                dispatch(fetchDataSuccess());
              })
              .catch((err) => {
                console.log(114, err.response.data);
                dispatch(fetchDataSuccess());
              });
          })
          .catch((err) => {
            console.log(99, err.response.data);
            dispatch(fetchDataSuccess());

            if (err.response.data.success === false) {
              const classReport = document.querySelector(
                ".report-login-text",
              ) as HTMLLIElement;
              classReport.style.display = "block";
            }
          });
      })
      .catch((err) => {
        console.log(83, err.response.data);
        dispatch(fetchDataSuccess());
      });
  };

  const handleonkeypress = (e: any) => {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == "13") {
      handleClickLogin();
    }
  };
  const loading = useAppSelector(selectLoading);

  return (
    <div>
      {loading && <LinearProgress />}

      <Header />
      <div className="container-Login">
        <div className="text-Login">
          <h2>Login to your account</h2>
          <p>
            In order to use the editing and rating capabilities of TMDB, as well
            as get personal recommendations you will need to login to your
            account. If you do not have an account, registering for an account
            is free and simple. Click here to get started.
          </p>
          <p>
            If you signed up but didn't get your verification email, click here
            to have it resent.
          </p>
        </div>
        <div className="report-login-text">
          <div className="title-report">There was a problem</div>
          <ul>
            <li>We couldn't find your username</li>
            <li>You have 8 remaining login attempts.</li>
          </ul>
        </div>
        <div className="text-box-login">
          <div className="box-login">
            <p>Username</p>
            <input type="text" name="" id="username" />
          </div>
          <div className="box-login">
            <p>Password</p>
            <input
              type="password"
              name=""
              id="password"
              onKeyPress={handleonkeypress}
            />
          </div>
          <div className="report-login"></div>
          <div className="Login-pass">
            <button className="btn-Login" onClick={handleClickLogin}>
              Đăng nhập
            </button>
            <span>Reset password</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
