import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Tracks } from '../../domain/track';
import { TrackPanel } from './track-panel';

export const TrackPanels: React.FunctionComponent<{tracks: Tracks}> = (props) => {
  return (
    <ListGroup as="ul" data-bs-theme="dark">
      {props.tracks.asList.map(track => <TrackPanel track={track} key={track.getNo}/>)}
    </ListGroup>
  );
}