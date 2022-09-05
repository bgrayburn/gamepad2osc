import React from 'react'

interface PanelProps {
  title: string
  sections: SectionProps[]
}

const Panel = ({title, sections}: PanelProps) => {
  return <div style={{border: '1px solid black', padding: '10px'}}>
    <h2>{title}</h2>
    {sections.map((s: SectionProps) => <Section title={s.title} children={s.children} key={s.title} />)}
  </div>
}

interface SectionProps {
  title: string
  children: React.ReactNode[]
}

const Section = ({title, children}: SectionProps) => {
  return <div>
    <h3>{title}</h3>
    {children}
  </div>
}

export default Panel
