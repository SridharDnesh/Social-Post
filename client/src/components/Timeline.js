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
                <p>Sorry! No posts available :</p>
              )}
            </div>
          </div>
        </section>

        <section class="bottom">
          <div class="container">
            {!this.props.timelineEmptyFlag && (
              <React.Fragment>
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
                  {!!this.props.postData.text && (
                    <div class="card-middle timeline-card-middle">{text}</div>
                  )}
                  {!!this.props.postData.imgSrc && (
                    <div class="card-bottom timeline-card-bottom">
                      <img src={imgSrc} alt="" />
                    </div>
                  )}
                  <div class="like-comment-share">
                    <span onClick={this.likeHandler}>
                      {/* <i class="far fa-heart lcs"></i> */}
                      {this.state.likeCount > 0 ? (
                        <i className="fas fa-heart lcs-liked"></i>
                      ) : (
                        <i className="far fa-heart lcs "></i>
                      )}
                    </span>
                    <span>
                      <i class="far fa-comment lcs"></i>
                    </span>
                    <span>
                      <i class="fas fa-share lcs"></i>
                    </span>
                    <span>
                      {this.state.likeCount > 0 && (
                        <span>{this.state.likeCount} likes</span>
                      )}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
