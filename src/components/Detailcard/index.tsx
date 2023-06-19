import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import "./detailcard.css";
interface mytype{
    repoName:string
    repoDesc:string
    noStars:string
    noIssues:string
    pushTime:string
    ownerName:string
}
export default function DetailCard({repoName,repoDesc,noStars,noIssues,pushTime,ownerName}:mytype) {
  return (
    <div className="container">
      <div className="horizontal_container">
        <div className="image_div">
        <img
          src="https://ionicframework.com/docs/img/demos/avatar.svg"
          alt=""
          className="avatar_detail_card"
        />
        </div>
        <div className="vertical_container">
          <h1>{repoName}</h1>
          <h4>{repoDesc}</h4>
          <div className="star_issue_lastpush">
            <h5>{noStars}</h5>
            <h5>{noIssues}</h5>
            <h5>Last pushed on {pushTime} by {ownerName}</h5>
          </div>
        </div>
        <div className="indetail_card_view">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEX///8AAADDw8Nqampzc3NwcHBtbW3GxsbV1dXKysri4uL4+PhSUlJ8fHzy8vL8/PxlZWU3NzeLi4uWlpYw0hvKAAAB2klEQVR4nO3dCU4DMRBE0XFYkiELAe5/VzYNcwKr6V//ncBWu9xtRiLLIkmSJEmSJEmSJEmSpP/stL5UL2Gq82WMca1exUz38e2hehnz3Mavx+qFTLPtcDxVr2SW17dti9iDug58FQ9/W8Rmcd/ic/VSZjkOfBYP/Cwek7KIPah7FbHXTUDT2KuIvW4CshjQNAKy6ABHEHBQHeAIAq6bgCwGtP6opoGtYlQWsQc1KovYg+qrn8ABjiCgilFNA3uj+uon8LMNgQMcQUDTCMiiAxxBwEF1gCMIuG4CshjV+gOyGFDFgCxib1QHOAJf/QQB101AFgOqGNU0sDeqr36CqCy+Vy9llr2Kt+qlzPKx7ZD6zxnwNcTnEP8JHN8P8TMNfi7FzzP4CuLf+EEVhGYQ//dSfAaD2gR+FoUeUdtEd0EVxGcQf4tCMxj0oodu0FGtO/wRDWr00Az6ou/Ojy/dBY1q0EsmaFSDVhDfJoIqCM2go1p3QW0CP4tCjyi+TQRlEFrBoAzib1FoBoNe9NANBrUJ/CUDPaJBjR6aQV/03fnxpTtHte4c1brDH1H87wHzf9OZ/7vc/N9WX+7kW/TH+fK1wWv1KuY6rdR/hSBJkiRJkiRJkiRJkpTuE4w7CsheE9msAAAAAElFTkSuQmCC"
            alt=""
            className="right_arrow_image"
          />
        </div>
      </div>
    </div>
  );
}
