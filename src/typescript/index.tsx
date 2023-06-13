import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './component/header';
import Track, {Tracks} from './domain/track';
import { TrackPanels } from './component/track-panels';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '/src/css/bootstrap-customize.css';

const container = document.getElementById('header');
const header = createRoot(container);
// TODO:初期データの準備
const tracks: Tracks = Tracks.empty();
tracks.add();
tracks.add();

header.render(
  <>
    <Header compiler="TypeScript" framework="React" />
    <main>
      <TrackPanels tracks={tracks} />
    </main>
  </>
);