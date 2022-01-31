import { useCallback, useState } from 'react';

const useToggle = () => {
  const [visible, setVisible] = useState(true);
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

export { useToggle };
