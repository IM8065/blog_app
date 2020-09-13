import React from "react";
import "./App.css";

import Navigation from "./components/Navigation";
import CreateArticle from "./components/CreateArticle";
import Article from "./components/Article";
import Comments from "./components/Comments";
import Register from "./components/Register";
import Signin from "./components/SignIn";
import Modal from "./components/Modal";
import ArticleList from "./components/ArticleList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: "home",
      isSignedIn: true,
      isArticleOpen: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
      articles: [
        {
          pid: 2,
          title: "Test Title",
          body: "I like to move it move it",
          user_id: "1",
          date_created: "3/21/20",
          like_user_id: [1, 2],
          likes: 2,
        },
      ],
      postId: "",
    };
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route: route });
  };

  toggleModalArticle = () => {
    this.setState((prevState) => ({
      ...prevState,
      isArticleOpen: !prevState.isArticleOpen,
    }));
  };

  componentDidMount() {
    fetch("http://localhost:5000/allposts", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((posts) => {
        this.setState({ articles: [...posts] });
      });
  }

  handleItemClick = (articleId) => {
    this.setState({ route: "details" });
    this.setState({ postId: articleId });
  };

  render() {
    return (
      <div className="App">
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <div className="search-results">
              <h1>Available Articles</h1>
              {this.state.articles.map((post, index) => (
                <ArticleList
                  key={post.pid}
                  {...post}
                  index={index}
                  itemClick={this.handleItemClick}
                />
              ))}
            </div>
            <div className="create-btns">
              <button className="create-btn" onClick={this.toggleModalArticle}>
                Create Article
              </button>
            </div>

            {this.state.isArticleOpen && (
              <Modal>
                <CreateArticle
                  userId={this.state.user.id}
                  isArticleOpen={this.state.isArticleOpen}
                  toggleModal={this.toggleModalArticle}
                />
              </Modal>
            )}
          </div>
        ) : this.state.route === "details" ? (
          <div>
            <a
              className="back-btn"
              onClick={() => this.onRouteChange("home")}
            >
              Back
            </a>
            <Article
              onRouteChange={this.onRouteChange}
              user={this.state.user.id}
              article={this.state.articles.filter(
                (post) => post.pid === this.state.postId
              )}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
