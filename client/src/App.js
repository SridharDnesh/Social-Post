import React from "react";

import UploadImage from "./components/uploadImage";

/**
 * POST
 */
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <UploadImage />
      </React.Fragment>
    );
  }
}

export default App;
