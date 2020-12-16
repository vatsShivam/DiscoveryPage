import React, { Component } from "react";

class DataRender extends Component {
  render() {
    const playerdata = this.props.playerdata;
    console.log(this.props);

    return playerdata.map((player) => {
      const { Player_Name, Country, Batting_Hand, Bowling_Skill, DOB } = player;

      return (
        <div class="col-md-6 col-lg-4 item" >
          <div class="box" style={{minHeight:"320px"}}>
            <h3 class="name">{Player_Name}</h3>
            <p class="title">{Country}</p>
            <p class="description">
              {Batting_Hand.split("_").join(" ")}ed Batsman
            </p>
            <p class="description">
              {Bowling_Skill.split("_").join(" ")} Bowler
            </p>
            <p class="description">{DOB} </p>
            <div class="social">
              <a href="#">
                <i class="fa fa-facebook-official"></i>
              </a>
              <a href="#">
                <i class="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
}
export default DataRender;
