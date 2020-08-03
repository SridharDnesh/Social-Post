import React, { Component } from "react";
import Timeline from "./Timeline";
import ReactTimeout from "react-timeout";

import axios from "axios";
import "../styles/uploadImage.css";
// Bootstrap Import
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      text: "",
      imagePreview: "",
      charactersLeft: 0,
      isLoading: false,
      postData: {},
      timelineEmptyFlag: true,
      message: "",
      isUploadButtonDisabled: false,
    };
  }

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  getImagePreviewSource(buffer, contentType) {
    var base64Flag = `data:${contentType};base64,`;
    var imageStr = this.arrayBufferToBase64(buffer);
    return base64Flag + imageStr;
  }

  handleTextChange = (e) => {
    const charCount = e.target.value.length;
    const charLeft = charCount;
    this.setState({
      text: e.target.value,
      charactersLeft: charLeft,
    });
  };

  handleWordCount = (e) => {
    const charCount = e.target.value.length;
    const charLeft = 120 - charCount;
    this.setState({
      charactersLeft: charLeft,
    });
  };

  onInputChange = (e) => {
    this.setState({
      file: e.target.files[0],
      imagePreview: e.target.files[0]
        ? URL.createObjectURL(e.target.files[0])
        : "",
      isUploadButtonDisabled: true,
    });
  };

  onCloseButtonClick = (e) => {
    this.fileInput.value = "";
    this.setState({
      imagePreview: "",
      file: "",
      isUploadButtonDisabled: false,
    });
  };

  showPosts = async () => {
    await axios.get("http://localhost:5000/api/image").then((res) => {
      let data, contentType, text;
      if (!!res.data.imageData.img) {
        data = res.data.imageData.img.data.data;
        contentType = res.data.imageData.img.contentType;
      }
      if (!!res.data.imageData.text) {
        text = res.data.imageData.text;
      }
      this.setState({
        isLoading: false,
        timelineEmptyFlag: false,
        postData: {
          imgSrc:
            !!data && !!contentType
              ? this.getImagePreviewSource(data, contentType)
              : "",
          text: !!text ? text : "",
        },
      });
    });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", this.state.file);
    formData.append("text", this.state.text);

    try {
      await axios
        .post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.fileInput.value = "";
          this.setState({
            file: "",
            text: "",
            imagePreview: "",
            charactersLeft: 0,
            isLoading: true,
            isUploadButtonDisabled: false,
          });

          this.props.setTimeout(this.showPosts, 2000);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err.response);
        this.setState({
          message: "Internal server error occured",
          imagePreview: "",
          file: "",
        });
        this.fileInput.value = "";
      } else {
        this.setState({
          message: "Unknown error occured",
          imagePreview: "",
          file: "",
        });
        this.fileInput.value = "";
      }
    }
  };

  onAlertClose = () => {
    this.setState({
      message: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* ========================================Alert=================================== */}
        {!!this.state.message && (
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <strong>{this.state.message}</strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.onAlertClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {/*========================================== PostBox =================================== */}
        <Container className="card-wrapper">
          <Row className="d-flex justify-content-center ">
            <Col lg={8} md={10}>
              <div className="card-container">
                {/* inner Container */}
                <Row>
                  <Col
                    xs={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img className="avatar" src="avatar.jpg" alt="Avatar" />
                  </Col>
                  <Col
                    xs={10}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <div className="post-container">
                      <form id="post-form" onSubmit={this.onFormSubmit}>
                        <div className="textarea-wrapper">
                          <Row>
                            <textarea
                              value={this.state.text}
                              onChange={this.handleTextChange}
                              name="text"
                              maxLength="120"
                              className="post-text"
                              placeholder="Whats on your mind, John Doe?"
                              wrap="hard"
                              rows="2"
                            ></textarea>
                          </Row>
                          <Row className="character-count-container">
                            <span className="character-count">
                              {this.state.charactersLeft}/120
                            </span>
                          </Row>
                        </div>
                        <div className="multiple">
                          <div className="first-image">
                            {/* This content is dynamic, render the selected photo */}

                            {!!this.state.imagePreview && (
                              <React.Fragment>
                                <img
                                  className="post-photo"
                                  src={this.state.imagePreview}
                                  alt=""
                                />
                                <div
                                  onClick={this.onCloseButtonClick}
                                  className="close-icon-container"
                                >
                                  <i className="fas fa-times close-icon"></i>
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
                <hr />
                {/*=========================== Buttons ==========================================*/}
                <Row className="d-flex align-items-center justify-content-center">
                  <Col
                    xs={6}
                    className="d-flex align-items-center justify-content-center h-50"
                  >
                    {/*------------- Add Photo button ----------------*/}
                    <label
                      htmlFor="file-upload"
                      className={`photo-button-label btn btn-outline-secondary ${
                        this.state.isUploadButtonDisabled
                          ? "disable-input-label"
                          : ""
                      }`}
                    >
                      <i className="far fa-images"></i> Add photo
                    </label>

                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      disabled={
                        this.state.imagePreview.length > 0 ? true : false
                      }
                      onChange={this.onInputChange}
                      ref={(ref) => (this.fileInput = ref)}
                    />
                  </Col>
                  <Col
                    xs={6}
                    className="d-flex align-items-center justify-content-center h-50"
                  >
                    {/*-------------------- Post Button -------------------------*/}
                    <Button
                      variant="outline-success"
                      className="post-button"
                      type="submit"
                      form="post-form"
                    >
                      {!this.state.isLoading ? (
                        <i className="fas fa-paper-plane load"></i>
                      ) : (
                        <span className="spinner-border spinner-border-sm load"></span>
                      )}
                      Post
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        {/* ========================================Timeline Component=================================== */}
        <Timeline
          postData={this.state.postData}
          timelineEmptyFlag={this.state.timelineEmptyFlag}
        />
      </React.Fragment>
    );
  }
}

export default ReactTimeout(UploadImage);
