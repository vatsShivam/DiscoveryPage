import React, { Component, Suspense } from "react";
import "./App.css";
import $ from "jquery";
import { data } from "./data";
const Infinite = React.lazy(() => import("./Elements/infinite"));
const AntComponent = React.lazy(() => import("./Elements/antdesign"));

class App extends Component {
  constructor() {
    super();
    this.fp = null;
    this.state = {
      data: [],
      val: true,
      res: "",
      next: true,
      filterOn: "default",
      filterBy: "",
      pageSize: 9,
      pageNumber: 1,
      totalData: [],
      nameValue: "",
    };
  }

  handleChange = (e) => {
    this.setState({ nameValue: e.target.value });
  };

  createDataGenerator = (arr) => {
    function* getNextData() {
      let pn = 1;
      while (pn * this.state.pageSize <= arr.length) {
        yield arr.slice(
          (pn - 1) * this.state.pageSize,
          (pn - 1) * this.state.pageSize + this.state.pageSize
        );
        pn += 1;
      }
      yield arr.slice(arr.length - (arr.length % 9), arr.length);
    }

    this.getNextData = getNextData.bind(this);
    return this.getNextData();
  };

  loadPage = () => {
    this.fp = this.createDataGenerator(data);
    this.setState((state) => {
      const fpData = this.fp.next();
      return { data: fpData.value, next: !fpData.done };
    });
  };

  componentWillMount() {
    this.fp = null;
    this.fp = this.createDataGenerator(data);
    this.setState((state) => {
      const fpData = this.fp.next();
      return { data: fpData.value, next: !fpData.done };
    });
  }

  async componentDidMount() {
    $(document).ready(() => {
      window.scrollTo(0, 0);
    });
  }

  fetchMoreData = () => {
    console.log("Fetching more data");
    const fpData = this.fp.next();
    if (!fpData.done) {
      console.log(fpData.value.length, fpData.done);
      if (fpData.value.length === 0) {
        this.setState({ next: false });
      } else {
        this.setState({
          data: [...this.state.data, ...fpData.value],
          next: !fpData.done,
        });
      }
    } else {
      this.setState({ next: false });
    }
  };

  selectFilter = (e) => {
    console.log(e.target.value);
    this.setState({ filterOn: e.target.value });
    if (e.target.value === "default") {
      this.loadPage();
    } else {
      this.createCustomGeneraor(e.target.value, this.state.nameValue);
    }
  };

  handleToggle = (e) => {
    document.documentElement.classList.toggle("dark-mode");
  };

  createCustomGeneraor = (filterOn, filterBy) => {
    const filteredData = data.filter((el) =>
      el[filterOn].toLowerCase().includes(filterBy.toLowerCase())
    );
    this.fp = this.createDataGenerator(filteredData);
    const iterator = this.fp.next();
    this.setState({
      data: iterator.value,
      next: iterator.value.length < this.state.pageSize ? false : true,
    });
  };

  applyFilter = async (e) => {
    this.createCustomGeneraor(this.state.filterOn, this.state.nameValue);
  };

  resetPageCounter = () => {
    this.setState({ pageNumber: 1 });
  };

  render() {
    return (
      <body>
        <div class="team-boxed">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              <select
                className="form-control col-sm-3"
                onChange={this.selectFilter}
              >
                <option value="Player_Name">Player Name</option>
                <option value="Country">Country</option>
                <option value="default" selected>
                  No Filter
                </option>
              </select>
              {this.state.filterOn !== "default" && (
                <input
                  style={{ marginLeft: "10px" }}
                  className="form-control col-sm-3"
                  onFocus={this.resetPageCounter}
                  onBlur={this.applyFilter}
                  type="text"
                  value={this.state.nameValue}
                  onChange={this.handleChange}
                ></input>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <AntComponent toggle={this.handleToggle} />
            </Suspense>
          </div>
          <div class="container">
            <div class="intro">
              <h2 class="text-center">IPL Discovery Page </h2>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Infinite
                dataLength={this.state.data.length}
                next={this.fetchMoreData}
                hasMore={this.state.next ? true : false}
                data={this.state.data}
              ></Infinite>
            </Suspense>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
