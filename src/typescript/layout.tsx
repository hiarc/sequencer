import * as React from 'react';
import { Header } from './component/header/header';
import { Tracks } from './domain/track';
import { TrackPanels } from './component/tracks/track-panels';
import { Col, Container, Row } from 'react-bootstrap';
import { PianoRoll } from './component/piano-roll/piano-roll';
import { Message } from './domain/message/interface';

export const Layout: React.FunctionComponent<{}> = (props) => {
  /** シーケンサーで入力したノートオンメッセージのリスト。 */
  const [messages, setMessages] = React.useState([]);

  /** シーケンサーに設定済みのMIDI出力ポート。 */
  const [port, setPort] = React.useState('');

  /** シーケンサーで設定したトラックのリスト。 */
  const tracks: Tracks = Tracks.default();

  /** ノートオンメッセージのリストに要素を追加する。 */
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