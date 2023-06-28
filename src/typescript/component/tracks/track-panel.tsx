import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import Track from '../../domain/track';

export const TrackPanel: React.FunctionComponent<{track: Track}> = (props) => {
  return (
    <ListGroup.Item as="li" variant="flush" data-bs-theme="dark">
      <div className="d-flex flex-row">
        <div className="p-1">
          <i className="bi bi-list-nested"></i>
        </div>
        <div className="p-1 flex-fill">
          {props.track.getName}
        </div>
      </div>
    </ListGroup.Item>
  );
}