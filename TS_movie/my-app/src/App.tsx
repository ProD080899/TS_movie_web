import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import Login from "./compoments/Login/Login";
import Home from "./compoments/Home/Home";
import NotFound from "./compoments/layout/NotFound";
import ProductChildren from "./compoments/Home/ProductChildren";
import ProductChildren1 from "./compoments/Home/ProductChildren1";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchMovie from "./compoments/Home/SearchMovie";
import PageUser from "./compoments/Home/PageUser";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchDataLoading,
  fetchDataSuccess,
  selectIntheater,
  selectSearch,
  selectTrending,
} from "./compoments/Home/CartMovieSlice";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedRoutesLogin from "./ProtectedRoutesLogin";
import Popular from "./compoments/ListHeader/Movies/Popular";
import NowPlaying from "./compoments/ListHeader/Movies/NowPlaying";
import Upcoming from "./compoments/ListHeader/Movies/Upcoming";
import TopRate from "./compoments/ListHeader/Movies/TopRate";

function App() {
  const localstorage = localStorage.getItem("search")
    ? JSON.parse(localStorage.getItem("search") || "{}")
    : {
        searchName: "",
      };
  const localstorage1 = localStorage.getItem("intheater")
    ? JSON.parse(localStorage.getItem("intheater") || "{}")
    : {
        namemovie: "popular",
      };
  const localstorage2 = localStorage.getItem("treding")
    ? JSON.parse(localStorage.getItem("treding") || "{}")
    : {
        nameTrending: "day",
      };
  // console.log(3541, localstorage);
  const dispatch = useAppDispatch();
  const [cartDataMovieTV, setCartDataMovieTV] = useState([]);
  const [cartTrending, setCartTrending] = useState([]);
  const namemovie = useAppSelector(selectIntheater);
  // console.log(399, namemovie);

  const nameTrending = useAppSelector(selectTrending);
  // console.log(37, nameTrending);
  useEffect(() => {
    dispatch(fetchDataLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${localstorage1.namemovie}?api_key=8827c7821b4ab2b478d40e975b4bcd60&language=en-US&page=1`,
      )
      .then((data) => {
        // console.log(22, data.data.results);
        setCartDataMovieTV(data.data.results);
        dispatch(fetchDataSuccess());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localstorage1.namemovie]);
  useEffect(() => {
    dispatch(fetchDataLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/${localstorage2.nameTrending}?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
      )
      .then((data) => {
        // console.log(27, data.data.results);
        setCartTrending(data.data.results);
        dispatch(fetchDataSuccess());
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [localstorage2.nameTrending]);
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
  const [pathSearch, setPathSearch] = useState("");
  const namesearch = useAppSelector(selectSearch);

  // console.log(94, localstorage.searchName);

  useEffect(() => {
    dispatch(fetchDataLoading());
    if (localstorage.searchName === "") {
      setPathSearch(`Home/search/query=`);
    } else {
      setPathSearch(
        `Home/search/query=${RemoveAccents(localstorage.searchName)
          .split(" " || "-")
          .join("")}`,
      );
    }
    dispatch(fetchDataSuccess());
  }, [localstorage.searchName]);

  // console.log(108, cartDataMovieTV);

  return (
    <div>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoutesLogin />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path={pathSearch} element={<SearchMovie />} />
            {/* <Route path={`User/${localstorage.user}`} element={<PageUser />} /> */}
            <Route path="Home/Movies/Popular" element={<Popular />} />
            <Route path="Home/Movies/NowPlaying" element={<NowPlaying />} />
            <Route path="Home/Movies/Upcoming" element={<Upcoming />} />
            <Route path="Home/Movies/TopRate" element={<TopRate />} />
            {cartDataMovieTV.map((value: any, i: any) => {
              return (
                <Route
                  key={i}
                  path={`Home/theMovie/Cart/${RemoveAccents(
                    value.title || value.name,
                  )
                    .split(" ")
                    .join("")}`}
                  element={
                    <ProductChildren
                      cartDataMovieTV={cartDataMovieTV}
                      chimuc={i}
                      value={value}
                    />
                  }
                />
              );
            })}
            {cartTrending.map((value: any, i: any) => {
              return (
                <Route
                  key={i}
                  path={`Home/theMovie/Cart/${RemoveAccents(
                    value.title || value.name,
                  )
                    .split(" ")
                    .join("")}`}
                  element={
                    <ProductChildren1
                      cartTrending={cartTrending}
                      chimuc={i}
                      value={value}
                    />
                  }
                />
              );
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
