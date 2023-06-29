import * as React from 'react';
import { Header } from './component/header/header';
import { Tracks } from './domain/track';
import { TrackPanels } from './component/tracks/track-panels';
import { Col, Container, Row } from 'react-bootstrap';
import { PianoRoll } from './component/piano-roll/piano-roll';
import { Message } from './domain/message/interface';

export const Layout: React.FunctionComponent<{}> = (props) => {
  const [messages, setMessages] = React.useState([]);
  const [port, setPort] = React.useState('');
  const tracks: Tracks = Tracks.default();
  const addMessage = (message: Message) => {
    setMessages(messages.concat(message));
  }
  return (
    <Container fluid>
      <Header messages={messages} port={port} setPort={(port: string) => setPort(port)}/>
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