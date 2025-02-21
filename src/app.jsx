import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Rank } from "./components/rank";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <Container>
      <ThemeToggle />
      <Row>
        <h1>Tibia ranking</h1>
      </Row>
      <Row className="align-items-center">
        <span className="dot"></span>Sharing partners
      </Row>
      <Row>
        <Rank />
      </Row>
    </Container>
  );
}