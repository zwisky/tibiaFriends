import React from "react";
import Table from "react-bootstrap/Table";
import { Char } from "./char";

function CustomLoader() {
  return (
    <div className="custom-loader">
      <div className="pot">
        <img 
          src="https://www.tibiawiki.com.br/images/1/16/Orc_Berserker.gif" 
          alt="Cargando..." 
          style={{ width: 100, height: 100 }}
        />
      </div>
    </div>
  );
}
export function CharList(props) {
  if (props.loading) {
    return <CustomLoader />;
  }
  
  return (
    <Table bordered hover responsive className="modern-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Character</th>
        </tr>
      </thead>
      <tbody>
        {props.charList.map((char, index) => (
          <Char
            key={char.name}
            char={char}
            clickChar={props.clickChar}
            activeChar={props.activeChar}
            activeMinLevelShare={props.activeChar?.minLevelShare}
            activeMaxLevelShare={props.activeChar?.maxLevelShare}
          />
        ))}
      </tbody>
    </Table>
  );
}
