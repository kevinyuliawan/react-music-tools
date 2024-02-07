import * as Tone from 'tone';
import { useState } from 'react';

//create a synth and connect it to the main output (your speakers)
let synth;

export default function Note ({ name, color, noteValue, mouseIsDown, keyboardKey, keyboardTriggerCode, keysDown }) {
  const [ clicked, setClicked ] = useState(false);
  const [ isPlaying, setIsPlaying ] = useState(false);

  function getSynth () {
    if (!synth) {
      synth = new Tone.PolySynth(Tone.Synth).toDestination();
    }

    return synth;
  }

  function playNote () {
    if (!isPlaying) {
      const now = Tone.now();
      getSynth().triggerAttack([noteValue], now);
      setIsPlaying(true);
    }
    
  }

  function releaseNote () {
    if (isPlaying) {
      getSynth().triggerRelease([noteValue]);
      setIsPlaying(false);
    }
  }

  function handleOnMouseDown (e) {
    e.preventDefault();
    setClicked(true);
  }

  function handleOnMouseUp (e) {
    e.preventDefault();
    setClicked(false);
  }

  function handleOnMouseOver (e) {
    e.preventDefault();
    if (mouseIsDown) {
      setClicked(true);
    }
  }

  function handleOnMouseLeave (e) {
    e.preventDefault();
    setClicked(false); 
  }

  function handleOnTouchStart (e) {
    e.cancelable && e.preventDefault();
    setClicked(true);
  }

  function handleOnTouchEnd (e) {
    e.cancelable && e.preventDefault();
    setClicked(false);
  }

  function handleOnTouchMove (e) {
    e.cancelable && e.preventDefault();
    if (mouseIsDown) {
      // TODO attempt to handle where touch is to trigger correct note
      // Can access X&Y coords of touch with e.touches[0].pageX|pageY
      // e.g. 'Drawing as the touches move' on https://developer.mozilla.org/en-US/docs/Web/API/Touch_events#example
    }
  }

  const keyCodeClicked = keysDown[keyboardTriggerCode];
  const isClicked = clicked || keyCodeClicked ? 'clicked' : '';
  const classNames = ['note', color, isClicked, name.toLowerCase()].join(' ');

  if (keyCodeClicked || clicked) {
    playNote();
  } else {
    releaseNote();
  }

  return (
    <div
      className={classNames} 
      onMouseDown={handleOnMouseDown} 
      onMouseUp={handleOnMouseUp}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onTouchMove={handleOnTouchMove}
    >

      {keyboardKey ? keyboardKey : ''}
      
    </div>
  )
}

// Based on https://codepen.io/enteleform/pen/PepqYV
// More inspo: https://github.com/michaelkolesidis/javascript-software-synthesizer