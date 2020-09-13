import React from "react";
import "./css/CreateComment.css";

class CreateComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="comment-modal">
        <form onSubmit={this.props.handleComments} id="contact-form">
          <label className="label" htmlFor="body">
            Body
          </label>
          <textarea className="input-field" id="text" name="body" id="body" />

          <div className="btns">
            <input id="submit-btn" type="submit" value="Submit" />
            <button id="submit-btn" onClick={this.props.toggleModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateComment;
