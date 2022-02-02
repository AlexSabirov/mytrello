import { FC } from 'react';
import styled from 'styled-components';

import { selectorColumns } from '../../store/ducks/board/selectors';
import { useAppSelector } from '../../store/hooks/redux';
import ColumnItem from '../column-item';

const ColumnList: FC = () => {
  const { columns } = useAppSelector(selectorColumns);
  return (
    <ColumnListWrapper>
      {Object.values(columns).map((column) => {
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
