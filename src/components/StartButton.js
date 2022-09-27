import React from 'react'
import { StyledStartButton } from './styles/StyledStartButton'

const StartButton = ({callback}) => {
  return (
    <StyledStartButton onClick={callback}>BEGIN GAMING</StyledStartButton>
  )
}

export default StartButton