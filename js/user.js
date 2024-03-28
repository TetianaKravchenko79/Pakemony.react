import React from "react";
import { Link } from "react-router-dom";
import { fetchData, resultAPI } from "./api";

export default class UserDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.location.userName
        ? this.props.location.userId
        : localStorage.userId,
      userName: this.props.location.userName
        ? this.props.location.userName
        : localStorage.userName,

      url: null,

      back_default: null,
      back_shiny: null,
      front_default: null,
      front_shiny: null,
    };
  }

  componentDidMount() {
    if (this.props.location.userName) {
      //this.props.location.userId != null
      localStorage.userId = this.props.location.userId;
      localStorage.userName = this.props.location.userName;
    }

    //this.getUrl();
    setTimeout(() => {
      //!!!
      this.getUrl();
    }, "200");
  }

  getUrl() {
    let user = JSON.parse(localStorage.users).filter(
      (user) => user.indexOriginal == this.state.userId
    );

    console.log(user);

    this.setState({
      url: user[0].url,
    });

    fetchData(user[0].url);

    const result = new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (resultAPI && Object.keys(resultAPI.sprites).length) {
          resolve(resultAPI.sprites);
          clearInterval(interval);
        }
      }, 50);
    });

    result
      .then((value) => {
        console.log(result);
        console.log(value);

        this.setState({
          back_default: value.back_default,
          back_shiny: value.back_shiny,
          front_default: value.front_default,
          front_shiny: value.front_shiny,
        });
      })
      .catch((value) => {
        console.log(result);
        console.error(value);
      });
  }

  makeRemove(index) {
    console.log(index);

    let users = JSON.parse(localStorage.users);

    users.splice(index, 1);

    users.map(function (user, index) {
      user.indexOriginal = index;
    });

    localStorage.users = JSON.stringify(users);

    //this.handleUsers(users);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Link to="/">back</Link>
        <h3>{this.state.userName}</h3>
        <h4>
          <a href={this.state.url}>{this.state.url}</a>
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <img src={this.state.back_default} alt="" />

          <img src={this.state.back_shiny} alt="" />

          <img src={this.state.front_default} alt="" />

          <img src={this.state.front_shiny} alt="" />
        </div>
        <div>
          <button
            className="btn btn-link"
            onClick={() => this.makeRemove(this.state.userId)}
          >
            remove
          </button>
        </div>
      </div>
    );
  }
}
