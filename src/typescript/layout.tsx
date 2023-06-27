import * as React from 'react';
import { Header } from './component/header';
import { Tracks } from './domain/track';
import { TrackPanels } from './component/track-panels';
import { Col, Container, Row } from 'react-bootstrap';
import { PianoRoll } from './component/piano-roll';
import { Message } from './domain/message/interface';

export const Layout: React.FunctionComponent<{}> = (props) => {
  const tracks: Tracks = Tracks.default();
  const [messages, setMessages] = React.useState([]);
  const addMessage = (message: Message) => {
    setMessages(messages.concat(message));
  }
  return (
    <Container fluid>
      <Header />
      <Row>
        <Col lg="2">
          <TrackPanels tracks={tracks} />
        </Col>
        <Col lg="10">
          <PianoRoll messages={messages} addMessage={(message: Message) => addMessage(message)}/>
        </Col>
      </Row>
    </Container>
  );
}