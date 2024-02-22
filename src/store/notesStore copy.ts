import { create } from "zustand";
 import axios from "axios";

//  Define the types for the notes and the store
export type Note = {
  title: string;
  subtitle: string;
  bodyText: string;
  id: string;
  [key: string]: string;
};
type NotesStore = {
  list: Note[];
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (note: Note) => void;
  addNotesFormApi: () => void;
};

// Create a store for notes
export const useNotesStore = create<NotesStore>((set) => ({
  list: [],
  // Add a note to the list
  addNote: (note) => set((state) => ({ list: [...state.list, note] })),
  // Remove a note from the list
  removeNote: (id: string) => {
    set((state) => ({
      list: state.list.filter((note) => note.id !== id),
    }));
  },

  // Update a note in the list
  updateNote: (note) =>
    set((state) => ({
      list: state.list.map((n) => (n.id === note.id ? note : n)),
    })),

  // Add notes from the API
  addNotesFormApi: () => {
    axios.get("../../data/notes.json").then(
      (response) => {
        set((state) => ({ list: response.data.notes }));
      },
      (error) => {
        console.log(error);
      }
    );
  },
}));
