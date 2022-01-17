import { FC, useContext } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import ColumnItem from '../column-item';

const ColumnList: FC = () => {
  const [state] = useContext(BoardContext);
  return (
    <ColumnListWrapper>
      {Object.values(state.columns).map((column) => {
        return <ColumnItem key={column.id} column={column} />;
      })}
    </ColumnListWrapper>
  );
};

const ColumnListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default ColumnList;
