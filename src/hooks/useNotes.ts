import { isBetween } from "@/helpers/dateHelpers";
import { useEffect, useState } from "react";

export type Note = {
  id: string;
  description: string;
  date: string;
};

export const useNotes = (type: string, startDate: string, endDate: string) => {
  const loadFromStorage = () => {
    const storedValue = localStorage.getItem(type);
    if (storedValue) {
      return JSON.parse(storedValue) as Note[];
    }
    return [];
  };

  const filteredFromStorage = () =>
    loadFromStorage().filter((note) =>
      isBetween(note.date, startDate, endDate)
    );

  const mergeWithStorage = (notes: Note[]) =>
    loadFromStorage()
      .filter((note) => !isBetween(note.date, startDate, endDate))
      .concat(notes);

  const [notes, setNotes] = useState<Note[]>(filteredFromStorage);

  useEffect(() => {
    setNotes(filteredFromStorage);
  }, [type]);

  useEffect(() => {
    localStorage.setItem(type, JSON.stringify(mergeWithStorage(notes)));
  }, [notes]);

  const addNote = (description: string) => {
    setNotes((prev) => [
      {
        id: new Date().getTime().toString(),
        description,
        date: endDate,
      },
      ...prev,
    ]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((t) => t.id !== id));
  };

  const updateNote = (note: Note) => {
    setNotes((prev) => prev.map((t) => (t.id === note.id ? note : t)));
  };

  return { notes, updateNote, deleteNote, addNote };
};
