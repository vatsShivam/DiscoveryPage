import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const DataRender = React.lazy(() => import("./dataRender"));
class Infinite extends Component {
  render() {
    return (
      <InfiniteScroll
        dataLength={this.props.dataLength}
        next={this.props.next}
        hasMore={this.props.hasMore}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        useWindow={false}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Hey that's the end!</b>
          </p>
        }
      >
        <div class="row people">
          <DataRender playerdata={this.props.data} />
        </div>
      </InfiniteScroll>
    );
  }
}
export default Infinite;
