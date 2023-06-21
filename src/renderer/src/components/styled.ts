import styled from 'styled-components'

interface GridProps {
  ledSize: string
  gap: string
}

export const StyledLedMatrix = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(8, ${(props) => props.ledSize});
  grid-template-rows: repeat(8, ${(props) => props.ledSize});
  gap: ${(props) => props.gap};
`
interface CodeGeneratorProps {
  width: string
  height: string
}

export const StyledCodeGenerator = styled.pre<CodeGeneratorProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: auto; // if the content exceeds the defined size, make it scrollable
`
