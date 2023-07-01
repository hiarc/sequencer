import React, { ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { fetchPortNames } from '../../repository/repository';

export const SettingsModal: React.FunctionComponent<{
  /** モーダルを表示するか。 */
  show: boolean,

  /** モーダルを非表示にする。 */
  onHide: () => void,

  /** シーケンサーに設定済みのMIDI出力ポート。 */
  port: string,

  /** シーケンサーのMIDI出力ポートを設定する。 */
  setPort: (port: string) => void

}> = (props) => {
  /**
   * モーダルで選択可能なMIDI出力ポート。
   * モーダル表示時のみ選択可能なポート名の取得を行う。
   * 非表示にした時には選択肢を空にする。
   */
  const [portNames, setPortNames] = React.useState([]);
  useEffect(() => {
    if(!props.show){
      return setPortNames([]);
    }

    fetchPortNames()
      .then(response => setPortNames(response.data))
      .catch(error => console.log(error));

  }, [props.show]);

  /**
   * モーダルで選択したMIDI出力ポート。
   * モーダル表示前に選択していたポートが初期選択される。
   * モーダルの決定ボタンをクリックした時に、シーケンサーに設定を反映する。
   */
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
          <option key={crypto.randomUUID()}>(Select Midi Output Port)</option>
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