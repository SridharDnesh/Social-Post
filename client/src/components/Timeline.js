import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/timeline.css";
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
      <Container className="mt-2">
        {/* ====================================NO POST TEXT ==================================== */}
        <Row>
          <Col>
            {this.props.timelineEmptyFlag && (
              <p className="timeline-empty-text">No posts available yet!</p>
            )}
          </Col>
        </Row>
        {/* ====================================POST WRAPPER ================================== */}
        <Row className="d-flex justify-content-center align-items-center">
          <Col
            lg={6}
            md={8}
            sm={10}
            xs={11}
            className="d-flex justify-content-center align-items-center wrapper-post"
          >
            <div className="post-display">
              {!this.props.timelineEmptyFlag && (
                <React.Fragment>
                  {/* ============================ User details - ROW 1 ================================*/}
                  <Row>
                    <Col>
                      <div className="user-details-container d-flex justify-content-start align-items-center">
                        <div className="avatar-container">
                          <img className="avatar" src="/avatar.jpg" alt="" />
                        </div>
                        <div className="user-name-container d-flex justify-content-center align-items-center">
                          <h5>John Doe</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {/* =================================== Post text Row 2 ========================== */}
                  {!!this.props.postData.text && (
                    <Row>
                      <Col className="post-text-container">
                        <h5 className="post-text-final">{text}</h5>
                      </Col>
                    </Row>
                  )}
                  {/*================================= photo Row 3 ================================= */}
                  {!!this.props.postData.imgSrc && (
                    <Row>
                      <Col>
                        <div className="post-photo-container">
                          <img
                            className="post-photo-final"
                            src={imgSrc}
                            alt="Alternate Text"
                          />
                        </div>
                      </Col>
                    </Row>
                  )}
                  {/*================================ Like Row ================================== */}
                  <Row>
                    <Col>
                      <div className="like-comment-share-container d-flex justify-content-start align-items-center">
                        <button
                          className="like-button "
                          onClick={this.likeHandler}
                        >
                          <span>
                            {this.state.likeCount > 0 ? (
                              <i className="fas fa-heart like-color"></i>
                            ) : (
                              <i className="far fa-heart "></i>
                            )}
                          </span>
                        </button>
                        <button className="like-button">
                          <span>
                            <i className="far fa-comment"></i>
                          </span>
                        </button>
                        <button className="like-button">
                          <span>
                            <i className="fas fa-share"></i>
                          </span>
                        </button>

                        <span>
                          {this.state.likeCount > 0 && (
                            <span>{this.state.likeCount} likes</span>
                          )}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
