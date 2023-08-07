import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { ModalProps } from '../modal';
import useCurrentState from '../utils/use-current-state';

export type ModalHooksBindings = Pick<ModalProps, 'visible' | 'onClose'>;

export type UseModalResult = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  currentRef: MutableRefObject<boolean>;
  bindings: ModalHooksBindings;
};

export default function useModal(
  initialVisible: boolean = false
): UseModalResult {
  const [visible, setVisible, currentRef] = useCurrentState(initialVisible);

  return {
    visible,
    setVisible,
    currentRef,
    bindings: {
      visible,
      onClose: () => setVisible(false),
    },
  };
}
