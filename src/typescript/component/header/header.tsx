import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NoteOnMessage from '../../domain/message/channel/voice/note-on';
import { play } from '../../repository/header-repository';
import { SettingsModal } from './settings-modal';

export const Header: React.FunctionComponent<{
  /** シーケンサーで入力したノートオンメッセージのリスト。 */
  messages: NoteOnMessage[], 

  /** シーケンサーに設定済みのMIDI出力ポート。 */
  port: string, 

  /** シーケンサーのMIDI出力ポートを設定する。 */
  setPort: (port: string) => void

}> = (props) => {

  /** 設定モーダルを表示するか。 */
  const [settingsIsShown, setSettingsShow] = React.useState(false);

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
              <NavDropdown.Item href="#">Save</NavDropdown.Item>
              <NavDropdown.Item href="#">Save as ...</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Open file</NavDropdown.Item>
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
              <NavDropdown.Item href="#" onClick={() => play(props.messages, props.port)}>Play</NavDropdown.Item>
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