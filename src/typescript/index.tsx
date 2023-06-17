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
import Notes from './domain/notes';

const container = document.getElementById('container');
const header = createRoot(container);
const tracks: Tracks = Tracks.default();

const notes: Notes = Notes.empty();

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