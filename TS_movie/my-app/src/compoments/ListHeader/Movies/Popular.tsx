import axios from "axios";
import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent } from "antd";
import "./Popular.css";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
function Popular() {
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [dataMovies, setDataMovies] = useState([]);
  const [name, setName] = useState("");
  const [datefrom, setDateFrom] = useState("");
  const [dateto, setDateto] = useState("");
  const [region, setRegion] = useState("");
  const [selectedOption, setSelectedOption] = useState<String>("None");
  const [language, setLanguage] = useState([]);
  console.log(18, dataMovies);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=8827c7821b4ab2b478d40e975b4bcd60&page=1`,
      )
      .then((data) => {
        console.log(data.data.results);
        setDataMovies(data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clicksortup = () => {
    const upsort = document.querySelector("#up-sort") as HTMLElement;
    upsort.style.display = "block";
    const downsort = document.querySelector("#down-sort") as HTMLElement;
    downsort.style.display = "none";
  };
  const clicksortdown = () => {
    const upsort = document.querySelector("#up-sort") as HTMLElement;
    upsort.style.display = "none";
    const downsort = document.querySelector("#down-sort") as HTMLElement;
    downsort.style.display = "block";
  };
  const clickfilterup = () => {
    const upsort = document.querySelector("#up-sort") as HTMLElement;
    upsort.style.display = "block";
    const downsort = document.querySelector("#down-sort") as HTMLElement;
    downsort.style.display = "none";
  };
  const valueSearchname = (e: any) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const submitdatefrom = () => {
    const datefrom = document.querySelector(
      "#from_date" || {},
    ) as HTMLInputElement;
    setDateFrom(datefrom.value);
  };
  console.log(50, "datafrom:", datefrom);
  const submitdateto = () => {
    const dateto = document.querySelector("#to_date" || {}) as HTMLInputElement;
    setDateto(dateto.value);
  };
  console.log(67, "dateto:", dateto);
  const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // console.log(value);
    setRegion(value);
  };
  const handleSortletterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setSelectedOption(value);
  };
  console.log(844444, selectedOption);
  const handleSearch = () => {
    if (selectedOption === "Title(Z-A)") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=8827c7821b4ab2b478d40e975b4bcd60&page=1`,
        )
        .then((data) => {
          console.log(data.data.results);
          let start = new Date(datefrom);
          let end = new Date(dateto);
          // console.log(130, start, end);
          const array = dataMovies.filter((value: any, i: any) => {
            if (datefrom === "" && dateto === "") return value;
            else
              return (
                new Date(value.release_date) <= end &&
                new Date(value.release_date) >= start
              );
          });
          console.log(1377777, array);
          setDataMovies(array);
          setDataMovies(
            array.sort((a: any, b: any) => b.title.localeCompare(a.title)),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedOption === "Title(A-Z)") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=8827c7821b4ab2b478d40e975b4bcd60&page=1`,
        )
        .then((data) => {
          console.log(data.data.results);

          let start = new Date(datefrom);
          let end = new Date(dateto);
          // console.log(130, start, end);
          const array = dataMovies.filter((value: any, i: any) => {
            if (datefrom === "" && dateto === "") return value;
            else
              return (
                new Date(value.release_date) <= end &&
                new Date(value.release_date) >= start
              );
          });
          console.log(1377777, array);
          setDataMovies(array);
          setDataMovies(
            array.sort((a: any, b: any) => a.title.localeCompare(b.title)),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=8827c7821b4ab2b478d40e975b4bcd60&page=1`,
        )
        .then((data) => {
          console.log(data.data.results);
          let start = new Date(datefrom);
          let end = new Date(dateto);
          // console.log(130, start, end);
          const array = dataMovies.filter((value: any, i: any) => {
            if (datefrom === "" && dateto === "") return value;
            else
              return (
                new Date(value.release_date) <= end &&
                new Date(value.release_date) >= start
              );
          });
          console.log(1377777, array);
          setDataMovies(array);
          setDataMovies(array);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/configuration/languages?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
      )
      .then((data) => {
        console.log(data.data);
        setLanguage(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="main_popular">
        <div className="title_popular">
          <h2>Popular Movies</h2>
        </div>
        <div className="content_popular">
          <div className="left_popular">
            <div className="sort_popular">
              <div className="div_title_sort">
                <span>Search Name</span>
                <div className="click_filter">
                  <i
                    className="fa-solid fa-angle-up"
                    id="up-sort"
                    onClick={clicksortdown}
                  ></i>
                  <i
                    className="fa-solid fa-chevron-down"
                    id="down-sort"
                    onClick={clicksortup}
                  ></i>
                </div>
              </div>
              <div className="filter_sort">
                <div className="div_name_sort">Sort Results By</div>
                <div className="select_sort">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={name}
                    onChange={valueSearchname}
                  />
                </div>
              </div>
            </div>
            <div className="sort_popular">
              <div className="div_title_sort">
                <span>Sort</span>
                <div className="click_filter">
                  <i
                    className="fa-solid fa-angle-up"
                    id="up-sort"
                    onClick={clicksortdown}
                  ></i>
                  <i
                    className="fa-solid fa-chevron-down"
                    id="down-sort"
                    onClick={clicksortup}
                  ></i>
                </div>
              </div>
              <div className="filter_sort">
                <div className="div_name_sort">Sort Results By</div>
                <div className="select_sort">
                  <select
                    className="select_sort"
                    style={{ width: "100%" }}
                    onChange={handleSortletterChange}
                  >
                    <option value="None">None</option>
                    <option value="Title(Z-A)">Title (Z-A)</option>
                    <option value="Title(A-Z)">Title (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="sort_popular">
              <div className="div_title_sort">
                <span>Popular Movies</span>
                <div className="click_filter">
                  <i className="fa-solid fa-angle-up" id="up-filter"></i>
                  <i className="fa-solid fa-chevron-down" id="down-filter"></i>
                </div>
              </div>
              <div className="filter_sort">
                <div className="show-me-name">Show Me</div>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Everything</Radio>
                  <Radio value={2}>Movies I Haven't Seen</Radio>
                  <Radio value={3}>Movies I Have Seen</Radio>
                </Radio.Group>
              </div>
              <div className="filter_sort">
                <div className="show-me-name">Release Dates</div>
                <div className="date_release">
                  <div className="from">
                    <span>from</span>
                    <input
                      type="date"
                      name=""
                      value={datefrom}
                      id="from_date"
                      onChange={submitdatefrom}
                    />
                  </div>
                  <div className="from">
                    <span>to</span>

                    <input
                      type="date"
                      name=""
                      id="to_date"
                      value={dateto}
                      onChange={submitdateto}
                    />
                  </div>
                </div>
              </div>
              <div className="filter_sort">
                <div className="div_name_sort">Language</div>
                <div className="select_sort">
                  <select
                    className="select_sort"
                    style={{ width: "100%" }}
                    onChange={selectLanguage}
                  >
                    {language.map((value: any, i: any) => {
                      return (
                        <option key={i} value={value.english_name}>
                          {value.english_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <button className="btn_search-popular" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="right_popular">
            {dataMovies.map((value: any, i: any) => {
              return (
                <div key={i} className="div_cart_popular">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
                    alt=""
                    style={{ width: "180px", height: "290px" }}
                  />
                  <div className="name_puplar">{value.name || value.title}</div>
                  <div className="date_popular">
                    {value.release_date.split("-").reverse().join("-")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Popular;
