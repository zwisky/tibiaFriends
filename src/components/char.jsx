import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

export function Char(props) {
  let rank = props.char["rank"];
  let minLevelShare = Math.round((props.char["level"] / 3) * 2);
  let maxLevelShare = Math.round((props.char["level"] / 2) * 3);
  
  let trophyColor, podium;

  const isActive = props.activeChar?.name === props.char.name;
  const canShare = props.char.level >= props.activeMinLevelShare && 
                   props.char.level <= props.activeMaxLevelShare;

  // Mapeo de imágenes
  const vocationImages = {
    'knight': '/img/chars/knight.gif',
    'elite knight': '/img/chars/knight.gif',
    'paladin': '/img/chars/paladin.gif',
    'royal paladin': '/img/chars/paladin.gif',
    'sorcerer': '/img/chars/sorcerer.gif',
    'master sorcerer': '/img/chars/sorcerer.gif',
    'druid': '/img/chars/druid.gif',
    'elder druid': '/img/chars/druid.gif'
  };

  const handleToggle = () => {
    if (isActive) {
      props.clickChar(null);
    } else {
      props.clickChar(props.char);
    }
  };

  // Buscar en other_characters el objeto que coincida con el nombre del personaje.
  // Si no se encuentra, se utiliza el status principal del objeto.
  const foundStatusObj = props.char.other_characters?.find(c => c.name === props.char.name);
  const currentStatus = (foundStatusObj ? foundStatusObj.status : props.char.status)?.toLowerCase().trim();

  return (
    <>
      <tr 
          onClick={handleToggle} 
          className={`${isActive ? 'tr-selected' : ''} ${canShare ? 'table-warning' : ''}`}
      >
        <td>
          <div className="d-flex align-items-center">
            <span className={`status-dot me-2 ${currentStatus === 'online' ? 'bg-success' : 'bg-danger'}`}></span>
            {props.char.name} {podium}
          </div>
        </td>
        <td>{props.char.level}</td>
      </tr>
      
      {isActive && (
        <tr className="expanded-row">
          <td colSpan="2">
            <div className="d-flex flex-row align-items-start p-3">
              <div className="image-container me-4">
                <img
                  src={vocationImages[props.char.vocation.toLowerCase()]}
                  alt={props.char.vocation}
                  className="vocation-img"
                />
              </div>
              <div className="character-details text-center">
                <p><strong>Vocation:</strong> {props.char.vocation}</p>
                <p><strong>Sex:</strong> {props.char.sex}</p>
                <p><strong>World:</strong> {props.char.world}</p>
                <p><strong>Residence:</strong> {props.char.residence}</p>
                <p><strong>Account Status:</strong> {props.char.account_status}</p>
                <p className="sharing-range">
                  <strong>Sharing Range:</strong> {minLevelShare} - {maxLevelShare}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
