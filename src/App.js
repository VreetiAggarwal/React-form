import React from "react";
import { Component } from "react";
import classes from "./Home.module.css";
import "./App.css";
import { useState } from "react";
import { Link } from "react-scroll";

const url = "https://jsonplaceholder.typicode.com/photos";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      DataLoaded: false,
      filter: null,
    };
  }

  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ data: json, DataLoaded: true });
      });
  }

  onChange = (event) => {
    this.setState({ data: event.target.value });
  };

  onDataSubmit = async (event) => {
    const response = this.state.data.filter((i) => {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    console.log(response.data.items);
    this.setState({
      data: response.data.items,
      filter: response.data.items[0],
    });
  };

  onSelect = (title) => {
    console.log(title);
    this.setState({ filter: title });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.data);
  };

  //Method to Delete the Record
  delete(item) {
    const data = this.state.data.filter((i) => i.id !== item.id);
    this.setState({ data });
  }

  render() {
    const { DataLoaded, data, filter } = this.state;

    if (!DataLoaded)
      return (
        <div>
          <h3>Loading please wait</h3>
        </div>
      );

    return (
      <div>
        <div>
          <form className={classes.form} onSubmit={this.onFormSubmit}>
            <input
              type="search"
              value={this.onInputChange}
              onChange={this.onChange}
            />
            <div>
              {/* {this.state.data.map(function (item) {
                <div key={item.id}>{item.title}</div>;
              })} */}
              <Link href="">
                <button onFormSubmit={this.onDataSubmit}> submit</button>
              </Link>
            </div>
          </form>
        </div>

        <div className={classes.table}>
          <div className={classes.col}>
            <h3 className={classes.title}>ID</h3>
            <h3 className={classes.title}>Image/Photo</h3>
            <h3 className={classes.title}>Title</h3>
            <h3 className={classes.title}> URL</h3>
            <h3 className={classes.title}>Delete Record</h3>
          </div>
          {data.map((item) => (
            <ol className={classes.rows} key={item.id}>
              <h4 className={classes.data}>{item.id}</h4>
              <h4 className={classes.data}>
                <a
                  href={item.thumbnailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.thumbnailUrl}
                </a>
              </h4>
              <h4 className={classes.data}>{item.title}</h4>
              <h4 className={classes.data}>{item.url}</h4>
              <button
                onClick={this.delete.bind(this, item)}
                className={classes.btn}
              >
                Delete
              </button>
            </ol>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
