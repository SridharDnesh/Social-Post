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
        <section className="middle">
          <div className="container">
            <hr className="hr-break" />
            <div className="middle-content">
              {this.props.timelineEmptyFlag && (
                <p>Sorry! No posts available :</p>
              )}
            </div>
          </div>
        </section>

        <section className="bottom">
          <div className="container">
            {!this.props.timelineEmptyFlag && (
              <React.Fragment>
                <div className="card-container timeline-card-container">
                  <div className="card-top timeline-card-top">
                    <div className="top-left timeline-top-left">
                      <div className="avatar">
                        <img src="images/avatar.jpg" alt="Avatar" />
                      </div>
                      <div className="avatar-details">
                        <h4>Angelina John</h4>
                        <p>Passionate hair stylist</p>
                      </div>
                    </div>
                    <div className="top-right timeline-top-right">
                      <p>Just now</p>
                    </div>
                  </div>
                  {!!this.props.postData.text && (
                    <div className="card-middle timeline-card-middle">
                      {text}
                    </div>
                  )}
                  {!!this.props.postData.imgSrc && (
                    <div className="card-bottom timeline-card-bottom">
                      <img src={imgSrc} alt="" />
                    </div>
                  )}
                  <div className="like-comment-share">
                    <span onClick={this.likeHandler}>
                      {/* <i className="far fa-heart lcs"></i> */}
                      {this.state.likeCount > 0 ? (
                        <i className="fas fa-heart lcs lcs-liked"></i>
                      ) : (
                        <i className="far fa-heart lcs "></i>
                      )}
                    </span>
                    <span>
                      <i className="far fa-comment lcs"></i>
                    </span>
                    <span>
                      <i className="fas fa-share lcs"></i>
                    </span>
                    <span className="like-count">
                      {this.state.likeCount > 0 ? (
                        <span>{this.state.likeCount} likes</span>
                      ) : (
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
