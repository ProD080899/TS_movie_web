import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CartMovie.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  fetchDataLoading,
  fetchDataSuccess,
  intheaterAction,
  trendingAction,
} from "./CartMovieSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function CartMovie() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cartDataMovieTV, setCartDataMovieTV] = useState([]);
  const [cartTrending, setCartTrending] = useState([]);
  const [nametrending, setnametrending] = useState("day");
  const [namemovie, setnamemovie] = useState("popular");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${namemovie}?api_key=8827c7821b4ab2b478d40e975b4bcd60&language=en-US&page=1`,
      )
      .then((data) => {
        // console.log(17, data.data.results);

        setCartDataMovieTV(data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [namemovie]);
  useEffect(() => {
    dispatch(fetchDataLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/${nametrending}?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
      )
      .then((data) => {
        // console.log(27, data.data.results);
        setCartTrending(data.data.results);
        dispatch(fetchDataSuccess());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nametrending]);

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
  function handleClickCartMovie(name: string) {
    navigate(`theMovie/Cart/${name}`);
  }
  function handleClickBtnCart() {
    const btn1 = document.querySelector(".btn1-primary-cart1") as HTMLElement;
    btn1.style.backgroundColor = "#fff";
    const btn2 = document.querySelector(".btn1-primary-cart") as HTMLElement;
    btn2.style.backgroundColor = "#032541";
    setnamemovie("top_rated");
    dispatch(intheaterAction({ namemovie: "top_rated" }));
  }
  function handleClickBtnCart1() {
    const btn1 = document.querySelector(".btn1-primary-cart") as HTMLElement;
    btn1.style.backgroundColor = "#fff";
    const btn2 = document.querySelector(".btn1-primary-cart1") as HTMLElement;
    btn2.style.backgroundColor = "#032541";
    setnamemovie("popular");
    dispatch(intheaterAction({ namemovie: "popular" }));
  }
  const handleClick2 = () => {
    const btn1 = document.querySelector(".btn1-primary-cart3") as HTMLElement;
    btn1.style.backgroundColor = "#1ed5a9";
    const btn2 = document.querySelector(".btn1-primary-cart2") as HTMLElement;
    btn2.style.backgroundColor = "#425c71";
  };
  const handleClick1 = () => {
    const btn1 = document.querySelector(".btn1-primary-cart2") as HTMLElement;
    btn1.style.backgroundColor = "#1ed5a9";
    const btn2 = document.querySelector(".btn1-primary-cart3") as HTMLElement;
    btn2.style.backgroundColor = "#425c71";
  };
  const handleClick3 = () => {
    const btn1 = document.querySelector(".btn1-primary-cart5") as HTMLElement;
    btn1.style.backgroundColor = "#425c71";
    btn1.style.color = "#1ed5a9";
    const btn2 = document.querySelector(".btn1-primary-cart6") as HTMLElement;
    btn2.style.backgroundColor = "#fff";

    setnametrending("day");
    dispatch(trendingAction({ nameTrending: "day" }));
    // window.localStorage.setItem(
    //   "treding",
    //   JSON.stringify({ nameTrending: "day" }),
    // );
  };
  const handleClick4 = () => {
    const btn1 = document.querySelector(".btn1-primary-cart6") as HTMLElement;
    btn1.style.backgroundColor = "#425c71";
    const btn2 = document.querySelector(".btn1-primary-cart5") as HTMLElement;
    btn2.style.backgroundColor = "#fff";
    btn2.style.color = "#1ed5a9";
    setnametrending("week");
    dispatch(trendingAction({ nameTrending: "week" }));
    // window.localStorage.setItem(
    //   "treding",
    //   JSON.stringify({ nameTrending: "week" }),
    // );
  };

  return (
    <div>
      <div className="container-cart">
        <div className="header-cart">
          <h2>What's Popular</h2>
          <div className="selector-wapter">
            <div className="btn1-primary-cart1" onClick={handleClickBtnCart1}>
              On TV
            </div>
            <div className="btn1-primary-cart" onClick={handleClickBtnCart}>
              In Theater
            </div>
          </div>
        </div>
        <div className="cart-group">
          {cartDataMovieTV.map((value: any, i: any) => {
            return (
              <div
                key={i}
                className="cart-item"
                onClick={() =>
                  handleClickCartMovie(
                    RemoveAccents(value.title || value.name)
                      .split(" ")
                      .join(""),
                  )
                }
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`}
                  alt=""
                />
                <div className="percent-cart-item">dsada</div>
                <CircularProgressbar
                  value={value.vote_average.toFixed(1) * 10}
                  text={`${value.vote_average.toFixed(1) * 10}%`}
                />
                ;
                <div className="info-cart-item">
                  <p className="text-cart-title">{value.title || value.name}</p>
                  <p className="text-cart-date">
                    {(value.release_date || value.first_air_date)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="header-cart2">
          <div className="group-header2-cart">
            <h2>Latest Trailers</h2>
            <div className="selector-wapter">
              <div className="btn1-primary-cart2" onClick={handleClick1}>
                On TV
              </div>
              <div className="btn1-primary-cart3" onClick={handleClick2}>
                In Theater
              </div>
            </div>
          </div>
          <p>This panel didn't return any results. Try refreshing it.</p>
        </div>
        <div className="header-cart">
          <h2>Trending</h2>
          <div className="selector-wapter">
            <div className="btn1-primary-cart5" onClick={handleClick3}>
              To Day
            </div>
            <div className="btn1-primary-cart6" onClick={handleClick4}>
              This Week
            </div>
          </div>
        </div>
        <div className="cart-group">
          {cartTrending.map((value: any, i: any) => {
            return (
              <div
                key={i}
                onClick={() =>
                  handleClickCartMovie(
                    RemoveAccents(value.title || value.name)
                      .split(" ")
                      .join(""),
                  )
                }
                className="cart-item"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
                  alt=""
                  style={{ width: "150px", height: "260px" }}
                />
                <div className="percent-cart-item"></div>
                <CircularProgressbar
                  value={value.vote_average.toFixed(1) * 10}
                  text={`${value.vote_average.toFixed(1) * 10}%`}
                />
                ;
                <div className="info-cart-item">
                  <p className="text-cart-title">{value.title || value.name}</p>
                  <p className="text-cart-date">
                    {(value.release_date || value.first_air_date)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CartMovie;
