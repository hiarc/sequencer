import * as React from 'react';
import { Container } from 'react-bootstrap';
import clone from "clone";
import { Header } from './component/header/header';
import { TrackPanels } from './component/tracks/track-panels';
import { PianoKey } from './component/piano-roll/piano-key';
import { PianoRoll } from './component/piano-roll/piano-roll';
import NoteOnMessage from './domain/message';
import { Tracks } from './domain/track';

export const Layout: React.FunctionComponent<{}> = (props) => {
  /** 現在選択しているMIDI出力ポート。 */
  const [port, setPort] = React.useState('');

  /** 現在開いているMIDIファイル。 */
  const [file, setFile] = React.useState<File>();

  /** 現在選択しているトラックの番号。 */
  const [trackIdx, setTrackIdx] = React.useState<number>(1);

  /** トラックのリスト。 */
  const [tracks, setTracks]= React.useState(Tracks.default());

  /** 現在選択しているトラックにノートオンメッセージを追加する。 */
  const addMessage = (message: NoteOnMessage) => {
    const newTracks: Tracks = clone(tracks);
    newTracks.addMessage(trackIdx, message);
    setTracks(newTracks);
  }

  const selectTrack = (targetIdx) => {
    setTrackIdx(targetIdx);
  }
  
  return (
    <Container fluid>
      <Header
        port={port}
        file={file}
        tracks={tracks}
        setFile={(file: File) => setFile(file)}
        setPort={(port: string) => setPort(port)}
        setTracks={(tracks: Tracks) => setTracks(tracks)}
      />
      <main className='main'>
        <TrackPanels tracks={tracks} />
        <PianoKey />
        <PianoRoll
          messages={tracks.get(trackIdx).messages}
          addMessage={(message: NoteOnMessage) => addMessage(message)}
        />
      </main>
    </Container>
  );
}