import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import Track from '../domain/track';

export const TrackPanel: React.FunctionComponent<{track: Track}> = (props) => {
  return (
    <ListGroup.Item as="li" variant="flush">
      no:{props.track.getNo}
      name:{props.track.getName}
    </ListGroup.Item>
  );
}