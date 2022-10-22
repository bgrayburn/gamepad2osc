import { MutableRefObject, useEffect, useState } from 'react'
import Panel from './Panel'
import OSC from 'osc-js'

type MappingType = 'button' | 'axes'
interface Mapping {
  input: string;
  output: string;
  type: MappingType;
}

interface MappingPanelProps {
  oscRef: MutableRefObject<{send: () => void}>;
  gamepad: Gamepad;
}
const MappingPanel = ({oscRef, gamepad}: MappingPanelProps) => {
  const [mappings, setMappings] = useState<Mapping[]>([])

  useEffect(() => {
    const osc = oscRef.current
    if (gamepad && osc) {
      applyMappings(gamepad, osc, mappings)
    }
  }, [gamepad, oscRef, mappings])

  const createMapping = (input: string, output: string, type: MappingType) =>
    setMappings([...mappings, {input, output, type}])
  const removeMapping = (i: number) => setMappings(mappings.filter((m, j) => i!==j))
  const sections = [
    {
      title: 'Actions',
      children: [
        <button onClick={() => createMapping(prompt('input') ?? '', prompt('output') ?? '', 'button')}>
          Create New Button Mapping
        </button>,
        <button onClick={() => createMapping(prompt('input') ?? '', prompt('output') ?? '', 'axes')}>
          Create New Axes Mapping
        </button>
      ]
    },
    {
      title: 'Mappings',
      children: mappings.map(
        (m: Mapping, i: number) => {
          const isActive = gamepad && (
            m.type === 'button' ?
              gamepad.buttons[parseInt(m.input)].pressed :
              Boolean(gamepad.axes[i*2] | gamepad.axes[(i*2) + 1])
          )
          return <MappingSegment
            mapping={m}
            removeMapping={() => removeMapping(i)}
            isActive={isActive} />
        }
      )
    }
  ]

  return <Panel title='Mappings' sections={sections} />
}

interface MappingSegmentProps {
  mapping: Mapping
  removeMapping: () => void,
  isActive: boolean
}

const MappingSegment = ({mapping, removeMapping, isActive}: MappingSegmentProps) => {
  const { input, output, type: mappingType } = mapping
  return <div style={
    {
      background: isActive ? '#AAA' : 'none',
      display: 'inline-block',
      padding: '10px',
      border: '1px solid black'
    }
  }>
    {mappingType} {input} - {output}
    <button onClick={() => removeMapping()}>X</button>
  </div>
}

const applyMappings =  (gamepad: Gamepad, osc: {send: any}, mappings: Mapping[]) => {
  mappings.forEach(m => {
    const inputKey = parseInt(m.input)
    switch (m.type) {
      case 'button':
        const button = gamepad.buttons[inputKey]
        if (button.pressed) {
          console.log(`would be applying a mapping from ${m.input} to ${m.output}`)
          const msg = new OSC.Message(m.output)
          osc && osc.send(msg)
        }
        break
      case 'axes':
        const ik2 = inputKey*2
        const [x, y]: number[] = gamepad.axes.slice(ik2, ik2+2)
        if (x | y) {
          const msg = new OSC.Message(m.output, x, y)
          osc.send(msg)
          console.log('x:', x)
          console.log('y:', y)
        }
    }
  })
}

export default MappingPanel
