import React, { useState } from 'react';
import Card from './components/card';
import styled, {createGlobalStyle} from 'styled-components';
import Modal from './components/modal';

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
	const [isModal, setModal] = React.useState(true)
	const onClose = () => setModal(false)

  return (
    <>
    <Global/>
    <AppWrapper>
      <Card />
      <Card />
      <Card />
      <Card />
		<Modal
        visible={isModal}
        title='Введите ваше имя:'
        onClose={onClose}
      />
    </AppWrapper>
    </>
  );
}

export default App;
