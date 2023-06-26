import * as React from 'react'

interface ArduinoPortsDropdownProps {
  ports: string[]
  selectedPort: string
  onPortChange: (port: string) => void
}

export const ArduinoPortsDropdown: React.FC<ArduinoPortsDropdownProps> = ({
  ports,
  selectedPort,
  onPortChange
}) => (
  <select value={selectedPort} onChange={(e) => onPortChange(e.target.value)}>
    {ports.map((port) => (
      <option key={port} value={port}>
        {port}
      </option>
    ))}
  </select>
)
