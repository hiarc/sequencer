import React, { ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { fetchPortNames } from '../../repository/header-repository';

export const SettingsModal: React.FunctionComponent<{
  show: boolean,
  onHide: () => void,
  port: string,
  setPort: (port: string) => void
}> = (props) => {
  const [portNames, setPortNames] = React.useState([]);

  useEffect(() => {
    // ダイアログ表示時のみポートの取得を行う
    if(!props.show){
      return setPortNames([]);
    }

    fetchPortNames()
      .then(response => setPortNames(response.data))
      .catch(error => console.log(error));

  }, [props.show]);

  const [selectedPort, setSelectedPort] = React.useState(props.port);
  const selectPort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPort(e.target.value);
  }

  const submit = () => {
    props.setPort(selectedPort);
    props.onHide();
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="header-settings"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="header-settings">
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3">
        <Form.Label>MIDI Output Port</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={selectedPort}
          onChange={(e) => selectPort(e)}
        >
          {portNames.map(port => <option value={port} key={crypto.randomUUID()}>{port}</option>)}
        </Form.Select>
        <Form.Text className="text-muted">
          Select Server-Side PC MIDI output port.
        </Form.Text>
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="light">Close</Button>
        <Button onClick={submit} variant="primary">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}