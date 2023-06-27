import React from "react";
import "./detailcard.css";


export default function DetailCard({RepoDetails}:any) {
  const {avatarUrl,name,description,stargazersCount,openIssuesCount,pushedAt,login} = RepoDetails || {}

  return (
    <div className="container">
      <div className="horizontal_container">
        <div className="image_div">
        <img
          src={avatarUrl}
          alt=""
          className="avatar_detail_card"
        />
        </div>
        <div className="vertical_container">
          <h1>{name}</h1>
          <h4>{description}</h4>
          <div className="star_issue_lastpush">
            <h5>Stars : {stargazersCount}</h5>
            <h5>Issues : {openIssuesCount}</h5>
            <h5>Last pushed : {pushedAt} by {login}</h5>
          </div>
        </div>
       
      </div>
    </div>
  );
}

// MuiAccordionSummary-content MuiAccordionSummary-contentGutters css-o4b71y-MuiAccordionSummary-content