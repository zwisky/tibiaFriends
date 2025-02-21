import React from "react";
import HashLoader from "react-spinners/HashLoader";
import Table from "react-bootstrap/Table";

import { Char } from "./char";

// Component of the table of chars, while (props.loading === true) it shows
// a spinner

export function CharList(props) {
  if (props.loading) {
    return <HashLoader size={50} color={"#343a40"} loading={props.loading} />;
  } 
  else {
    return (
      <Table bordered hover size="sm">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Level</th>
            <th>Status</th>
            <th>Sharing levels</th>
          </tr>
        </thead>
        <tbody>
          {props.charList.map((objectChar, index) => (
            <Char char={objectChar}
              clickChar={props.clickChar}
              index={index}
              key={index}
              activeChar={index == props.activeChar.index ? true : false}
              activeMaxLevelShare={props.activeChar.maxLevelShare}
              activeMinLevelShare={props.activeChar.minLevelShare}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}
