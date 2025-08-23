import { useEffect, useState } from "react";

type Note = {
  id: string;
};

export function useNotes<N extends Note>(
  key: string,
  selector: (note: N) => boolean
) {
  const loadFromStorage = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as N[];
    }
    return [];
  };

  const filteredFromStorage = () => loadFromStorage().filter(selector);

  const mergeWithStorage = (notes: N[]) =>
    loadFromStorage()
      .filter((note) => !selector(note))
      .concat(notes);

  const [notes, setNotes] = useState<N[]>(filteredFromStorage);

  useEffect(() => {
    setNotes(filteredFromStorage);
  }, [key, selector]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(mergeWithStorage(notes)));
  }, [notes]);

  const addNote = (note: Omit<N, "id">) => {
    setNotes((prev) => [
      {
        ...note,
        id: new Date().getTime().toString(),
      } as N,
      ...prev,
    ]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((t) => t.id !== id));
  };

  const updateNote = (note: N) => {
    setNotes((prev) => prev.map((t) => (t.id === note.id ? note : t)));
  };

  return { notes, updateNote, deleteNote, addNote };
}
