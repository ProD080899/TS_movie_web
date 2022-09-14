import React from "react";
import "./PageUser.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
function PageUser() {
  // const localstorage = localStorage.getItem("reduxState")
  //   ? JSON.parse(localStorage.getItem("reduxState"))
  //   : {
  //       login: {
  //         success: false,
  //         user: "",
  //       },
  //     };
  return (
    <div>
      <Header />
      <div className="main-user">
        <div className="bg_image">
          <div className="inner-content">
            <div className="icon-user">D</div>

            <div className="content-about">
              <div className="content-wapter-flex">
                {/* <div className="user-name">{localstorage.login.user}</div> */}
                <h3>Member since July 2022</h3>
              </div>
              <div className="content-wapter-flex">
                <div className="Name-Score">
                  <div className="result-content">
                    <span>100</span>
                  </div>
                  <div className="name-content">
                    Average <br />
                    Movie Score
                  </div>
                </div>
                <div className="Name-Score">
                  <div className="result-content">
                    <span>100</span>
                  </div>
                  <div className="name-content">
                    Average <br />
                    TV Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageUser;
