import axios from "axios";
import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent } from "antd";
import "./TopRate.css";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
function TopRate() {
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
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=8827c7821b4ab2b478d40e975b4bcd60&language=en-US&page=1`,
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
    //   console.log(50, datefrom.value);
    setDateFrom(datefrom.value);
  };
  const submitdateto = () => {
    const dateto = document.querySelector("#to_date" || {}) as HTMLInputElement;
    //   console.log(50, datefrom.value);
    setDateto(dateto.value);
  };
  const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // console.log(value);
    setRegion(value);
  };
  const handleSearch = () => {
    // axios
    //   .get(
    //     `https://api.themoviedb.org/3/search/movie?api_key=8827c7821b4ab2b478d40e975b4bcd60&language=en-US&query=${name}&page=1&include_adult=false&region=${region}&year=${datefrom}&primary_release_year=${dateto}`,
    //   )
    //   .then((data) => {
    //     console.log(data.data.results);
    //     setDataMovies(data.data.results);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  
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
                  <select className="select_sort" style={{ width: "100%" }}>
                    <option value="volTitle(Z-A)">Title (Z-A)</option>
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
                    <option value="NoneSelected">None selected</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Janpanese">Janpanese</option>
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
                <div className="div_cart_popular">
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

export default TopRate;
