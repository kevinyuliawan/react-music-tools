import { useState, useEffect, useRef } from 'react';
import OctavesSelect from './OctavesSelect';
import FirstNoteSelect from './FirstNoteSelect.jsx';
import Checkbox from '../components/Checkbox.jsx';
import { KEYS } from './Notes.jsx';
import Note from './Note';
import './Piano.css';

export default function Piano () {
  const [ octaves, setOctaves ] = useState(3);
  const [ firstNote, setFirstNote ] = useState('C3');
  const [ scaleWidth, setScaleWidth ] = useState(false);
  const [ mouseIsDown, setMouseIsDown ] = useState(null);
  const [ keysDown, setKeysDown ] = useState({});

  const pianoRef = useRef(null);

  useEffect(() => {
    function onMouseDown () {
      setMouseIsDown(true)
    }
    function onMouseUp () {
      setMouseIsDown(false)
    }
    document.documentElement.addEventListener("mousedown", onMouseDown);
    document.documentElement.addEventListener("mouseup", onMouseUp);

    return () => {
      document.documentElement.removeEventListener('mousedown', onMouseDown);
      document.documentElement.removeEventListener('mousedown', onMouseUp);
    }

  }, []);

  useEffect(() => {
    function onKeyDown (e) {
      const keyCode = e.keyCode;
      if (!keysDown[keyCode]) {
        setKeysDown({
          ...keysDown,
          [keyCode]: true,
        });
      }

    }
    function onKeyUp (e) {
      const keyCode = e.keyCode;
      if(keysDown[keyCode]) {
        setKeysDown({
          ...keysDown,
          [keyCode]: false,
        })
      }

    }
    document.documentElement.addEventListener('keydown', onKeyDown);
    document.documentElement.addEventListener('keyup', onKeyUp);

    return () => {
      document.documentElement.removeEventListener('keydown', onKeyDown);
      document.documentElement.removeEventListener('keyup', onKeyUp);
    }
  });

  useEffect(() => {
    // TODO handle overflow to second row properly; Min+max sizing of keys on desktop+mobile
    if (scaleWidth) {
      updateCssVariables();
    } else {
      updateCssVariables(3);
    }
  }, [octaves, scaleWidth])

  function updateCssVariables (chosenOctaves=null) {
    if (pianoRef.current) {
      const amountOfWhKeys = (chosenOctaves || octaves) * 7;
      pianoRef.current.style.setProperty('--piano-wh-keys-amount', amountOfWhKeys);
    }
  }

  function changeOctaves (selection) {
    setOctaves(selection);
  }

  function changeFirstNote (selection) {
    setFirstNote(selection)
  }

  function changeScaleWidth (e) {
    setScaleWidth(e.target.checked);
  }

  let pianoNotes = [];
  let updatedKeys;
  const keyboardTriggers = [
    {keyboardKey: 'a', code: 65},
    {keyboardKey: 'w', code: 87},
    {keyboardKey: 's', code: 83},
    {keyboardKey: 'e', code: 69},
    {keyboardKey: 'd', code: 68},
    {keyboardKey: 'f', code: 70},
    {keyboardKey: 't', code: 84},
    {keyboardKey: 'g', code: 71},
    {keyboardKey: 'y', code: 89},
    {keyboardKey: 'h', code: 72},
    {keyboardKey: 'u', code: 85},
    {keyboardKey: 'j', code: 74},
    {keyboardKey: 'k', code: 75},
  ];

  for (let i=0;i<octaves;i++) {
    const firstNoteOctave = Number(firstNote[1]);
    const currentOctave = firstNoteOctave + i;
    updatedKeys = KEYS.map((k,idx) => {
      const currentKeyIndex = i * 7 + idx;
      const keyboardTrigger = keyboardTriggers[currentKeyIndex] || {};
      return {
        ...k,
        ...keyboardTrigger,
        noteValue: `${k.name}${currentOctave}`,
      }
    })
    pianoNotes = [...pianoNotes, ...updatedKeys]
  }

  const notesJsx = pianoNotes.map((k, idx) => 
    <Note 
      key={idx} 
      name={k.name} 
      color={k.color} 
      noteValue={k.noteValue} 
      keyboardKey={keyboardTriggers[idx]?.keyboardKey}
      keyboardTriggerCode={keyboardTriggers[idx]?.code} 
      mouseIsDown={mouseIsDown} 
      keysDown={keysDown}
    />
  )

  return (
    <div className="piano" ref={pianoRef}>
      <OctavesSelect 
        onChange={changeOctaves} 
        value={octaves}
      />
      <FirstNoteSelect
        onChange={changeFirstNote}
        value={firstNote}
      />
      <Checkbox
        label=" Fit to one row"
        onChange={changeScaleWidth}
        defaultValue={scaleWidth}
      />
      <div className="mb-3"></div>
      {notesJsx}
    </div>
  )
}