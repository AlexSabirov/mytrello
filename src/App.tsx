import React, { useState } from 'react';
import { Card } from './components/card/card';
import styled, {createGlobalStyle} from 'styled-components';

const Global = createGlobalStyle`
* {
	box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`
const AppWrapper = styled.div`
display: flex;
flex-wrap: wrap;
align-items: flex-start;
`

const App: React.FC = () => {

  return (
    <>
    <Global/>
    <AppWrapper>
      <Card />
      <Card />
      <Card />
      <Card />
    </AppWrapper>
    </>
  );
}

export default App;
