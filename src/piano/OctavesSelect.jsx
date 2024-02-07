import Select from '../components/Select';

const OCTAVE_OPTIONS = [
  {id: 1, value: 1, name: '1'},
  {id: 2, value: 2, name: '2'},
  {id: 3, value: 3, name: '3'},
  {id: 4, value: 4, name: '4'},
  {id: 5, value: 5, name: '5'},
  {id: 6, value: 6, name: '6'},
]

export default function OctavesSelect ({ onChange, value }) {
  return (
    <>
      <Select
        label="Amount of octaves:"
        options={OCTAVE_OPTIONS}
        defaultValue={value}
        onChange={onChange}
      />
    </>
  )
}