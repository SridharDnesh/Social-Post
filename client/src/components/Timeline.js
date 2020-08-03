import React, { Component } from "react";

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineEmptyFlag: true,
      likeCount: 0,
    };
  }

  likeHandler = () => {
    let newCount = this.state.likeCount + 1;
    this.setState({
      likeCount: newCount,
    });
  };
  render() {
    const { imgSrc, text } = this.props.postData;
    return (
      <React.Fragment>
        <section class="middle">
          <div class="container">
            <hr />
            <div class="middle-content">
              {this.props.timelineEmptyFlag && (
                <p>Sorry! No posts available :(</p>
              )}
            </div>
          </div>
        </section>

        <section class="bottom">
          <div class="container">
            <div class="card-container timeline-card-container">
              <div class="card-top timeline-card-top">
                <div class="top-left timeline-top-left">
                  <div class="avatar">
                    <img src="images/avatar.jpg" alt="Avatar" />
                  </div>
                  <div class="avatar-details">
                    <h4>Angelina John</h4>
                    <p>Passionate hair stylist</p>
                  </div>
                </div>
                <div class="top-right timeline-top-right">
                  <p>Just now</p>
                </div>
              </div>
              <div class="card-middle timeline-card-middle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                odio? Expedita dignissimos asperiores nesciunt possimus.
              </div>
              <div class="card-bottom timeline-card-bottom">
                <img src="images/preview-image.jpg" alt="" />
              </div>
              <div class="like-comment-share">
                <i class="far fa-heart lcs"></i>
                <i class="far fa-comment lcs"></i>
                <i class="fas fa-share lcs"></i>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
