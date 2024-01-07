import React from "react";
import "./GetStarted.css";
import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Homyz</span>
          <span className="secondaryText">
            Find super attractive price quotes from us.
            <br />
            Find your PG's' soon
          </span>

          <button className="button" href>
            <Link to="/properties">Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
