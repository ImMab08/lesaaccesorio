import { create } from "zustand";

const useModalStore = create((set) => ({
  modals: {},
  openModal: (modalName) => set((state) => ({
    modals: {...state.modals, [modalName]: true}
  })),
  closeModal: (modalName) => set((state) => ({
    modals: {...state, [modalName]: false}
  })),
})) 

export default useModalStore;