import React from "react";
import Header from "../layout/Header";
import Title1 from "./Title1";
import CartMovie from "../Home/CartMovie";
import Footer from "../layout/Footer";
import "./CartMovie.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "../../app/hooks";
import { selectLoading } from "./CartMovieSlice";

function Home() {
  const loading = useAppSelector(selectLoading);
  // console.log(loading);

  return (
    <div>
      {loading && <LinearProgress />}
      <Header />
      <div className="main-home">
        <Title1 />
        <CartMovie />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
