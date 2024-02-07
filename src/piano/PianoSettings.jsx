// TODO extract piano settings into here

import { useContext } from 'react';
import SettingsContext from './SettingsContext.js';

export default function PianoSettings () {
  const settings = useContext(SettingsContext);

  return (
    <SettingsContext.Provider value={settings}>
      <div className="piano-settings">
        <h1>Piano settings</h1>
      </div>
    </SettingsContext.Provider>
  )
}