import React from "react";
import "../styles/style.css";

export default function Navbar() {
  return (
    <React.Fragment>
      <header>
        <div class="container nav-container">
          <nav>
            <div class="nav-brand">
              <a href="#">
                <img src="images/logo.png" alt="LOGO" />
              </a>
            </div>

            <div class="menu-icons open">
              <i class="icon ion-md-menu"></i>
            </div>

            <ul class="nav-list">
              <div class="menu-icons close">
                <i class="icon ion-md-close"></i>
              </div>
              <li class="nav-item">
                <a href="#" class="nav-link current">
                  Feed
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  Jobs
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  Notifications
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  Bazaar
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
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
