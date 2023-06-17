import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import Notes from '../domain/notes';

export const PianoRoll: React.FunctionComponent<{notes: Notes}> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="50" height="50" color="#001111" fill="fill"/>
    </svg>
  );
}