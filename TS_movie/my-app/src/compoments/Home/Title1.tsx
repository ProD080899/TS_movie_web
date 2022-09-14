import React from "react";
import "./Title1.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { searchAciton } from "../Home/CartMovieSlice";

function Title1() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [trending, setCartTrending] = useState(
    "/xVbppM1xgbskOKgOuV8fbWBWHtt.jpg",
  );
  const [inputSearch, setInputSearch] = useState("");
  // console.log(14, inputSearch);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
      )
      .then((data) => {
        console.log(
          data.data.results[Math.floor(Math.random() * 20 + 1)].backdrop_path,
        );

        setCartTrending(
          data.data.results[Math.floor(Math.random() * 20 + 1)].backdrop_path,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      if (inputSearch === null || inputSearch === "") {
        navigate(`search/query=`);
        dispatch(searchAciton({ searchName: inputSearch }));
      } else {
        dispatch(searchAciton({ searchName: inputSearch }));

        navigate(
          `search/query=${RemoveAccents(inputSearch)
            .split(" " || "-")
            .join("")}`,
        );
      }
    }
  };
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
  const handleSearchName = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputSearch === null || inputSearch === "") {
      navigate(`search/query=`);
      dispatch(searchAciton({ searchName: inputSearch }));
    } else {
      dispatch(searchAciton({ searchName: inputSearch }));
      navigate(
        `search/query=${RemoveAccents(inputSearch)
          .split(" " || "-")
          .join("")}`,
      );
    }
  };

  return (
    <div>
      <div className="main-title">
        <div
          className="title1-container"
          style={{
            backgroundImage: `url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)${trending}')`,
          }}
        >
          <div className="waper-title1">
            <div className="content-wapter-title1">
              <div className="text-title1">
                <p className="text-title1-w1"> Welcome.</p>
                <p className="text-title1-w2">
                  Millions of movies, TV shows and people to discover. Explore
                  now.
                </p>
              </div>
              <div className="search-title1">
                <div className="search">
                  <input
                    type="text"
                    name=""
                    id="text-title1"
                    placeholder="Search for a movie, tv show, person...."
                    onKeyDown={handleInput}
                    onChange={handleInputSearchName}
                  />
                  <button
                    className="search-title1-btn"
                    onClick={handleSearchName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Title1;
