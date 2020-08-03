import React, { Component, Fragment } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Timeline from "./Timeline";
import "../styles/style.css";

export default class uploadImage extends Component {
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
      console.log(err);
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
  // ======================================RENDER================
  render() {
    return (
      <Fragment>
        <Navbar />
        <main>
          <section class="hero">
            <div class="container">
              <div class="card-container">
                <div class="card-top">
                  <div class="top-left">
                    <div class="avatar">
                      <img src="images/avatar.jpg" alt="Avatar" />
                    </div>
                    <div class="avatar-details">
                      <h4>Angelina John</h4>
                      <p>Passionate hair stylist</p>
                    </div>
                  </div>
                  <div class="top-right">
                    {/* Label addition */}
                    <label
                      htmlFor="file-upload"
                      className={`label-alternate ${
                        this.state.isUploadButtonDisabled
                          ? "disable-input-label"
                          : ""
                      }`}
                    >
                      <i className="far fa-images"></i> Add photo
                    </label>
                    {/* <button>
                      <span class="icon-add">
                        <i class="far fa-image"></i>
                      </span>
                      Add
                    </button> */}
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
                    <button type="submit" form="post-form">
                      {!this.state.isLoading ? (
                        <i className="fas fa-paper-plane load"></i>
                      ) : (
                        <span className="spinner-border spinner-border-sm load"></span>
                      )}
                      Post
                    </button>
                  </div>
                </div>
                <div class="card-bottom">
                  <form id="post-form" onSubmit={this.onFormSubmit}>
                    <div class="image-placeholder">
                      {!!this.state.imagePreview && (
                        <React.Fragment>
                          <span onClick={this.onCloseButtonClick}>
                            <i class="far fa-times-circle"></i>
                          </span>
                          <img src={this.state.imagePreview} alt="" />
                        </React.Fragment>
                      )}
                    </div>
                    <div class="textarea-container">
                      <textarea
                        name="text"
                        id="text"
                        placeholder="Hey! Try something here"
                        maxlength="120"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                      ></textarea>
                      <span>{this.state.charactersLeft}/120</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* TIMELINE */}
          <Timeline
            postData={this.state.postData}
            timelineEmptyFlag={this.state.timelineEmptyFlag}
          />
        </main>
      </Fragment>
    );
  }
}
