import Select from "../components/Select";

const firstNoteOptions = [
  {id: 'c0', value: 'C0', name: 'C0'},
  {id: 'c1', value: 'C1', name: 'C1'},
  {id: 'c2', value: 'C2', name: 'C2'},
  {id: 'c3', value: 'C3', name: 'C3'},
  {id: 'c4', value: 'C4', name: 'C4'},
  {id: 'c5', value: 'C5', name: 'C5'},
  {id: 'c6', value: 'C6', name: 'C6'},
]

export default function FirstNoteSelect ({ value, onChange }) {
  return (
    <>
      <Select
        label="First note:"
        options={firstNoteOptions}
        defaultValue={value}
        onChange={onChange}
      />
    </>
  )
}