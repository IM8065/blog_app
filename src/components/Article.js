import React from "react";
import "./css/Article.css";
import thumpsUp from "./images/ThumbsUp.svg";
import comment from "./images/CommentCircleAltChatMessage.svg";
import Modal from "./Modal";
import CreateComment from "./CreateComment";
import Comments from "./Comments";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      comments: [],
      isCommentOpen: false,
    };
  }

  componentDidMount = () => {
    const post_id = this.props.article[0].pid;
    this.setState({ likes: this.props.article[0].likes });
    fetch("http://localhost:5000/allcomments", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((comments) => {
        let post_comments = comments.filter((comment) => {
          return comment.post_id === post_id;
        });
        this.setState({ comments: [...post_comments] });
      });
  };

  toggleModalComment = () => {
    this.setState((prevState) => ({
      ...prevState,
      isCommentOpen: !prevState.isCommentOpen,
    }));
  };

  handleLikes = () => {
    const user_id = this.props.user;
    const post_id = this.props.article[0].pid;

    fetch("http://localhost:5000/like", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user_id,
        pid: post_id,
      }),
    })
      .then((response) => response.json())
      .then((like) => {
        this.setState((prevState) => {
          return { likes: prevState.likes + 1 };
        });
      })
      .catch((err) => console.log(err));
  };

  handleComments = (event) => {
    event.preventDefault();
    const user_id = this.props.user;
    const post_id = this.props.article[0].pid;
    const data = {
      pid: post_id,
      body: event.target.body.value,
      uid: user_id,
    };
    fetch("http://localhost:5000/commenttodb", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response.body);
      // this.setState((prevState) => {
      //   return { comments: prevState.comments.push(response) };
      // });
      this.toggleModalComment();
    });
  };

  render() {
    return (
      <div className="article-container">

        <div className="main">
          <h1>{this.props.article[0].title}</h1>
          <p>{this.props.article[0].body}</p>
        </div>

        <div className="buttons">
          <p className="push" onClick={this.handleLikes.bind(this)}>
            {this.state.likes} <img src={thumpsUp} />
          </p>

          <p className="push" onClick={this.handleComments.bind(this)}>
            {this.state.comments.length} <img src={comment} />
          </p>
        </div>

        <button className="create-btn" onClick={this.toggleModalComment}>
          Create Comment
        </button>

        {this.state.isCommentOpen && (
          <Modal>
            <CreateComment
              isCommentOpen={this.state.isCommentOpen}
              toggleModal={this.toggleModalComment}
              handleComments={this.handleComments}
            />
          </Modal>
        )}

        <div className="search-results">
          <h1>Comments</h1>
          {this.state.comments.map((comment, index) => (
            <Comments key={comment.cid} {...comment} index={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default Article;
