import React from "react";
import "./css/CreateArticle.css";

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user_id = this.props.userId;
    const data = {
      title: event.target.title.value,
      body: event.target.body.value,
      id: user_id,
    };
    fetch("http://localhost:5000/posttodb", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
      })
      .then((post) => {
        console.log(post);
      });

      this.props.toggleModal();
  }

  render() {
    return (
      <div className="article-modal">
        <form onSubmit={this.handleSubmit} id="contact-form">
          <label className="label" htmlFor="title">
            Title
          </label>
          <input className="input-field" type="text" name="title" id="title" />

          <label className="label" htmlFor="body">
            Body
          </label>
          <textarea className="input-field" type="text" name="body" id="body" />

          <div className="btns">
            <button id="submit-btn" type="submit">
              Submit
            </button>
            <button id="submit-btn" onClick={this.props.toggleModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateArticle;
