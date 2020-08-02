import React from "react";

import UploadImage from "./components/uploadImage";

// import Timeline from "./components/Timeline";

// import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";

/**
 * POST
 */
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     img: "",
  //   };
  // }

  // arrayBufferToBase64(buffer) {
  //   var binary = "";
  //   var bytes = [].slice.call(new Uint8Array(buffer));
  //   bytes.forEach((b) => (binary += String.fromCharCode(b)));
  //   return window.btoa(binary);
  // }

  // componentDidMount() {
  //   axios.get("/api/image").then((res) => {
  //     var contentType = res.data.imageData.img.contentType;
  //     var base64Flag = `data:${contentType};base64,`;
  //     var param = res.data.imageData.img.data.data;
  //     var imageStr = this.arrayBufferToBase64(param);

  //     this.setState({
  //       img: base64Flag + imageStr,
  //     });
  //   });
  // }

  render() {
    // const { img } = this.state;

    // return <img src={img} alt="Alternate" />;
    return (
      <React.Fragment>
        <UploadImage />
      </React.Fragment>
    );
  }
}

export default App;
