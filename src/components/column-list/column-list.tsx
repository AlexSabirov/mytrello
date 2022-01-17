import { useContext } from 'react';
import styled from 'styled-components';

import { BoardContext } from '../../context/board/board-context';
import ColumnItem from '../column-item';

const ColumnListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const ColumnList: React.FC = () => {
  const [state] = useContext(BoardContext);
  return (
    <ColumnListWrapper>
      {Object.values(state.columns).map((column) => {
        return (
          <ColumnItem key={column.id} columnId={column.id}>
            <div>{column.title}</div>
          </ColumnItem>
        );
      })}
    </ColumnListWrapper>
  );
};

export default ColumnList;
