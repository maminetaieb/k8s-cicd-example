import create from 'zustand'

export const useNavStore = create((set, get) => ({
  toggled: false,
  toggle: () => {
    set({ toggled: !get().toggled })
  },
  setToggle: (toggle) => {
    set({ toggled: toggle })
  },
}))
