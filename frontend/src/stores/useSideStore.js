import create from 'zustand'

export const useSideStore = create((set, get) => ({
  expanded: true,
  toggle: () => {
    set({ expanded: !get().expanded })
  },
  setExpanded: (expanded) => {
    set({ expanded })
  },
}))
