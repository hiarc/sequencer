import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { nowDateTime } from '../../common/date-utils';
import { play, saveAndDownload, selectFile, uploadFile } from '../../repository/repository';
import { SettingsModal } from './settings-modal';
import { Tracks } from '../../domain/track';

export const Header: React.FunctionComponent<{
  /** 現在選択しているMIDI出力ポート。 */
  port: string, 

  /** 現在開いているMIDIファイル。 */
  file: File,

  /** トラックのリスト。 */
  tracks: Tracks, 

  /** MIDIファイルを設定する。 */
  setFile: (file: File) => void,

  /** MIDI出力ポートを設定する。 */
  setPort: (port: string) => void,

  /** トラックを設定する。 */
  setTracks: (tracks: Tracks) => void

}> = (props) => {

  /** 設定モーダルを表示するか。 */
  const [settingsIsShown, setSettingsShow] = React.useState(false);

  const openFile = async () => {
    const file = await selectFile();
    const tracks = await uploadFile(file);
    props.setFile(file);
    props.setTracks(tracks)
  }

  const saveAndDownloadFile = () => {
    const filename = `new_file_${nowDateTime()}.mid`;
    // saveAndDownload(props.tracks, filename);
  }
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='header'>
      <Container>
        <Navbar.Brand href="#home">SoundStadio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="File" id="header-dropdown-file">
              <NavDropdown.Item href="#">New file</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={() => saveAndDownloadFile()}>Save</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={() => openFile()}>Open file</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Edit" id="header-dropdown-edit">
              <NavDropdown.Item href="#">Undo</NavDropdown.Item>
              <NavDropdown.Item href="#">Redo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Add note</NavDropdown.Item>
              <NavDropdown.Item href="#">Select note</NavDropdown.Item>
              <NavDropdown.Item href="#">Mod note</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown title="Player" id="header-dropdown-player">
              <NavDropdown.Item href="#" onClick={() => play(props.port, props.tracks)}>Play</NavDropdown.Item>
              <NavDropdown.Item href="#">Stop</NavDropdown.Item>
              <NavDropdown.Item href="#">Jump to</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link id="header-dropdown-settings" onClick={() => setSettingsShow(true)}>Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <SettingsModal
        show={settingsIsShown}
        onHide={() => setSettingsShow(false)}
        port={props.port}
        setPort={(port) => props.setPort(port)}
      />
    </Navbar>
  );
}