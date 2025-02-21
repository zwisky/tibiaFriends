import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Rank } from './components/rank';
import musicaDeFondo from './musica/tibiasong.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';

function App() {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const handleClick = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
      if (newMutedState) {
        setVolume(0);
      } else {
        setVolume(0.5);
      }
    }
  };

  return (
    <Container onClick={handleClick} style={{ height: '100vh' }}>
      <Row>
        <h1 className="mt-3">TibiaFriends Rank</h1>
        <audio ref={audioRef} src={musicaDeFondo} loop preload="auto" />
      </Row>
      <Row>
        <Rank />
      </Row>

      {/* Control de volumen */}
      <div className="volume-control-container">
        <button 
          className="volume-button"
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          aria-label="Control de volumen"
        >
          <FontAwesomeIcon 
            icon={isMuted ? faVolumeOff : faVolumeUp}  
            className="volume-icon" 
          />
        </button>
        
        {showVolumeControl && (
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Ajustar volumen"
              orient="vertical"
            />
          </div>
        )}
      </div>
    </Container>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);