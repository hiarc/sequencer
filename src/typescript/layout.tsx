import * as React from 'react';
import { Header } from './component/header/header';
import { Tracks } from './domain/track';
import { TrackPanels } from './component/tracks/track-panels';
import { Container } from 'react-bootstrap';
import { PIANO_ROLLE_HEIGHT, PianoRoll } from './component/piano-roll/piano-roll';
import NoteOnMessage from './domain/message';
import { PianoKey } from './component/piano-roll/piano-key';

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
      <main className='main'>
        <TrackPanels tracks={tracks} />
        <PianoKey />
        <PianoRoll
          messages={messages}
          addMessage={(message: NoteOnMessage) => addMessage(message)}
        />
      </main>
    </Container>
  );
}