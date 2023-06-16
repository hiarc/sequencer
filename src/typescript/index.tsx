import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './component/header';
import Track, {Tracks} from './domain/track';
import { TrackPanels } from './component/track-panels';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '/src/css/bootstrap-customize.css';
import { Col, Container, Row } from 'react-bootstrap';

const container = document.getElementById('container');
const header = createRoot(container);
// TODO:初期データの準備
const tracks: Tracks = Tracks.empty();
tracks.add();
tracks.add();
tracks.add();

header.render(
  <>
    <Container fluid>
      <Header />
      <Row>
        <Col lg="2">
          <TrackPanels tracks={tracks} />
        </Col>
        <Col lg="10">
          <TrackPanels tracks={tracks} />
        </Col>
      </Row>
    </Container>
  </>
);