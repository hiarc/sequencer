import * as React from 'react';
import { Header } from './component/header/header';
import { Tracks } from './domain/track';
import { TrackPanels } from './component/tracks/track-panels';
import { Col, Container, Row } from 'react-bootstrap';
import { PianoRoll } from './component/piano-roll/piano-roll';
import NoteOnMessage from './domain/message';

export const Layout: React.FunctionComponent<{}> = (props) => {
  /** 現在開いているMIDIファイル。 */
  const [file, setFile] = React.useState<File>();

  /** シーケンサーで入力したノートオンメッセージのリスト。 */
  const [messages, setMessages] = React.useState<NoteOnMessage[]>([]);

  /** シーケンサーに設定済みのMIDI出力ポート。 */
  const [port, setPort] = React.useState('');

  /** シーケンサーで設定したトラックのリスト。 */
  const tracks: Tracks = Tracks.default();

  /** ノートオンメッセージのリストに要素を追加する。 */
  const addMessage = (message: NoteOnMessage) => {
    setMessages(messages.concat(message));
  }
  
  return (
    <Container fluid>
      <Header
        file={file}
        messages={messages}
        port={port}
        setFile={(file: File) => setFile(file)}
        setPort={(port: string) => setPort(port)}
        setMessage={(messages: []) => setMessages(messages)}
      />
      <Row>
        <Col lg="2">
          <TrackPanels tracks={tracks} />
        </Col>
        <Col lg="10">
          <PianoRoll
            messages={messages}
            addMessage={(message: NoteOnMessage) => addMessage(message)}
          />
        </Col>
      </Row>
    </Container>
  );
}