import useDialogStore from '@/app/stores/useDialogStore';

const show = useDialogStore.getState().showDialog;

const success = (title: string, description: string) => {
  show({ type: 'success', title, description });
};

const error = (title: string, description: string) => {
  show({ type: 'error', title, description });
};

const warning = (title: string, description: string) => {
  show({ type: 'warning', title, description });
};

const info = (title: string, description: string) => {
  show({ type: 'info', title, description });
};

const confirm = (title: string, description: string, onConfirm: () => void) => {
  show({ type: 'confirm', title, description, onConfirm });
};

const DialogUtils = {
  success,
  error,
  warning,
  info,
  confirm,
};

export default DialogUtils;
