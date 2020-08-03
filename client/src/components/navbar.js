import React from "react";
import "../styles/style.css";

export default function Navbar() {
  return (
    <React.Fragment>
      <header>
        <div className="container nav-container">
          <nav>
            <div className="nav-brand">
              <a href="#">
                <img src="images/logo.png" alt="LOGO" />
              </a>
            </div>

            <div className="menu-icons open">
              <i className="icon ion-md-menu"></i>
            </div>

            <ul className="nav-list">
              <div className="menu-icons close">
                <i className="icon ion-md-close"></i>
              </div>
              <li className="nav-item">
                <a href="#" className="nav-link current">
                  Feed
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Jobs
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Notifications
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Bazaar
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  {" "}
                  MyProfile
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}
