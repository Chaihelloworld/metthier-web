import { create } from 'zustand';

type DialogType = 'error' | 'success' | 'warning' | 'info' | 'confirm';

interface DialogState {
  open: boolean;
  type: DialogType;
  title: string;
  description: string;
  onConfirm: (() => void) | null;
}

interface DialogActions {
  showDialog: (params: {
    type?: DialogType;
    title: string;
    description: string;
    onConfirm?: () => void;
  }) => void;
  closeDialog: () => void;
}

const useDialogStore = create<DialogState & DialogActions>((set) => ({
  open: false,
  type: 'info',
  title: '',
  description: '',
  onConfirm: null,

  showDialog: ({ type = 'info', title, description, onConfirm }) =>
    set({ open: true, type, title, description, onConfirm: onConfirm ?? null }),

  closeDialog: () => set({ open: false, onConfirm: null }),
}));

export default useDialogStore;
