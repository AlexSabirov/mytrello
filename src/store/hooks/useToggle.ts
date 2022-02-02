import { useCallback, useState } from 'react';

export const useToggle = (value: boolean) => {
  const [visible, setVisible] = useState(value);
  const toggle = useCallback(() => {
    setVisible((visible) => !visible);
  }, [setVisible]);
  const close = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const open = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  return { visible, toggle, close, open };
};
