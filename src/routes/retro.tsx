import { createFileRoute } from "@tanstack/react-router";
import { Button, Column, Dropdown, Grid, TextInput } from "@carbon/react";
import { useToday } from "@/hooks/useToday";
import { useNotes } from "@/hooks/useNotes";
import NotesList from "@/components/Notes/NotesList";
import { useCallback, useState } from "react";
import { Add } from "@carbon/icons-react";
import { isBetween } from "@/helpers/dateHelpers";

export const Route = createFileRoute("/retro")({
  component: Retro,
});

type RetroNote = {
  id: string;
  date: string;
  description: string;
};

type NoteType = "kudos" | "highlights" | "lowlights" | "learnings";

const selectItems: { text: string; type: NoteType }[] = [
  {
    text: "Kudos",
    type: "kudos",
  },
  {
    text: "Highlights",
    type: "highlights",
  },
  {
    text: "Lowlights",
    type: "lowlights",
  },
  {
    text: "Learnings",
    type: "learnings",
  },
];

function Retro() {
  const { today, twoWeeksAgo } = useToday();
  const noteSelector = useCallback(
    (note: RetroNote) => isBetween(note.date, twoWeeksAgo, today),
    [today, twoWeeksAgo]
  );

  const {
    notes: kudos,
    addNote: addKudos,
    deleteNote: deleteKudos,
    updateNote: updateKudos,
  } = useNotes<RetroNote>("kudos", noteSelector);
  const {
    notes: highlights,
    addNote: addHighlight,
    deleteNote: deleteHighlight,
    updateNote: updateHighlight,
  } = useNotes<RetroNote>("highlights", noteSelector);
  const {
    notes: lowlights,
    addNote: addLowlight,
    deleteNote: deleteLowlight,
    updateNote: updateLowlight,
  } = useNotes<RetroNote>("lowlights", noteSelector);
  const {
    notes: learnings,
    addNote: addLearning,
    deleteNote: deleteLearning,
    updateNote: updateLearning,
  } = useNotes<RetroNote>("learnings", noteSelector);
  const [selectedItem, setSelectedItem] = useState(selectItems[0]);
  const [newNote, setNewNote] = useState("");

  const isValidNewNote = () => newNote.trim().length > 0;
  const addNote = () => {
    if (!isValidNewNote()) return;

    switch (selectedItem.type) {
      case "kudos":
        addKudos({
          date: today,
          description: newNote.trim(),
        });
        break;
      case "highlights":
        addHighlight({
          date: today,
          description: newNote.trim(),
        });
        break;
      case "lowlights":
        addLowlight({
          date: today,
          description: newNote.trim(),
        });
        break;
      case "learnings":
        addLearning({
          date: today,
          description: newNote.trim(),
        });
        break;
    }
    setNewNote("");
  };

  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <div
          style={{
            display: "flex",
          }}
        >
          <Dropdown
            style={{
              width: "150px",
            }}
            id="note-type"
            selectedItem={selectedItem}
            onChange={({ selectedItem }) => setSelectedItem(selectedItem!)}
            itemToString={(item) => item?.text ?? ""}
            items={selectItems}
            label="Note type"
            titleText="Note type"
            hideLabel
          />
          <TextInput
            id={"retro-input"}
            labelText="Add Note"
            hideLabel
            value={newNote}
            onChange={(event) =>
              setNewNote((event.target as HTMLInputElement).value)
            }
            onKeyUp={(event) => {
              if (event.key === "Enter") addNote();
            }}
            placeholder="Type description here"
            size="md"
            type="text"
            style={{
              marginBottom: "16px",
            }}
          />
          <Button
            size="md"
            kind="tertiary"
            hasIconOnly
            renderIcon={Add}
            iconDescription="Add note"
            disabled={!isValidNewNote()}
            onClick={addNote}
          />
        </div>
        <h2>Kudos</h2>
        <NotesList
          notes={kudos}
          onDeleteNote={deleteKudos}
          onUpdateNote={updateKudos}
        />
        <h2>Highlights</h2>
        <NotesList
          notes={highlights}
          onDeleteNote={deleteHighlight}
          onUpdateNote={updateHighlight}
        />
        <h2>Lowlights</h2>
        <NotesList
          notes={lowlights}
          onDeleteNote={deleteLowlight}
          onUpdateNote={updateLowlight}
        />
        <h2>Learnings</h2>
        <NotesList
          notes={learnings}
          onDeleteNote={deleteLearning}
          onUpdateNote={updateLearning}
        />
      </Column>
    </Grid>
  );
}
