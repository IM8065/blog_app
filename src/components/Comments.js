import React from "react";
import "./css/Comments.css";
import profilePic from "./images/UserAccountProfile.svg";

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: profilePic,
    };
  }
  render() {
    const { cid, comment, user_id, post_id, date_created } = this.props;

    return (
      <div className="comment">
        <div className="profile-content">
          <div className="profile-image-container">
            <img className="profile-image" src={this.state.profile} />
          </div>
          <p>{user_id}</p>
        </div>

        <div className="comment-content">
          <p>{comment}</p>
          <p>Posted: {date_created}</p>
        </div>
      </div>
    );
  }
}

export default Comments;
