import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './component/header';
import Track, {Tracks} from './domain/track';
import { TrackPanels } from './component/track-panels';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '/src/css/bootstrap-customize.css';
import '/src/css/sequenser.css';
import { Col, Container, Row } from 'react-bootstrap';
import { PianoRoll } from './component/piano-roll';

const container = document.getElementById('container');
const header = createRoot(container);
const tracks: Tracks = Tracks.default();

// TODO: piano-roll.tsx コンポーネントから親コンポーネントの属性を操作する正しい方法の調査
export const notes = [];

header.render(
  <>
    <Container fluid>
      <Header />
      <Row>
        <Col lg="2">
          <TrackPanels tracks={tracks} />
        </Col>
        <Col lg="10">
          <PianoRoll notes={notes} />
        </Col>
      </Row>
    </Container>
  </>
);