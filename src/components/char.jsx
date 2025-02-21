import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

// Component of a row representing a Char
export function Char(props) {
  let rank = props.char["rank"];
  let minLevelShare = Math.round((props.char["level"] / 3) * 2);
  let maxLevelShare = Math.round((props.char["level"] / 2) * 3);
  
  let trophyColor, podium, status;

  if (rank <= 3) {
    if (rank == 1) { trophyColor = "goldenrod" }
    else if (rank == 2) { trophyColor = "silver" }
    else { trophyColor = "#b87333" }
    podium = <FontAwesomeIcon icon={faTrophy} color={trophyColor} />;
  }

  let char = {
    index: props.index,
    name: props.char["name"], 
    level: props.char["level"],
    minLevelShare: minLevelShare,
    maxLevelShare: maxLevelShare,
  }

  if (props.activeChar) { status = "table-info" }
  else if (props.char["level"] >= props.activeMinLevelShare && props.char["level"] <= props.activeMaxLevelShare) {
    status = "table-warning"
  }

  return (
    <tr onClick={() => { props.clickChar(char) }} className={status} >

      <td>{props.char["rank"]}</td>
      <td>{props.char["name"]} {podium}</td>
      <td>{props.char["level"]}</td>
      <td className={props.char["status"] === "online" ? "text-success" : "text-danger"}>{props.char["status"]}</td>
      <td>
        {minLevelShare} -{" "}
        {maxLevelShare}
      </td>
    </tr>
  );
}
