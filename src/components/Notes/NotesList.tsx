import { transformDescription } from "@/helpers/markdownHelpers";
import { Edit, TrashCan } from "@carbon/icons-react";
import { Button, Modal, TextInput } from "@carbon/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import Markdown from "react-markdown";

type DescriptionNote = {
  id: string;
  description: string;
};

type NotesListProps<N extends DescriptionNote> = {
  notes: N[];
  onDeleteNote: (id: string) => void;
  onUpdateNote: (note: N) => void;
};

function NotesList<N extends DescriptionNote>({
  notes,
  onDeleteNote,
  onUpdateNote,
}: NotesListProps<N>) {
  const [editNote, setEditNote] = useState<N | null>(null);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        {notes.map((note, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <Markdown>{transformDescription(note.description)}</Markdown>
            </div>
            <div>
              <Button
                size="sm"
                kind="ghost"
                hasIconOnly
                renderIcon={Edit}
                iconDescription="Edit task"
                onClick={() => setEditNote({ ...note })}
              />
              <Button
                size="sm"
                kind="danger--ghost"
                hasIconOnly
                renderIcon={TrashCan}
                iconDescription="Delete task"
                onClick={() => onDeleteNote(note.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {createPortal(
        <Modal
          onRequestClose={() => {
            setEditNote(null);
          }}
          onRequestSubmit={() => {
            onUpdateNote(editNote!);
            setEditNote(null);
          }}
          modalHeading="Edit note description"
          primaryButtonText="Update"
          secondaryButtonText="Cancel"
          aria-label="Note editor"
          open={editNote !== null}
        >
          <TextInput
            data-modal-primary-focus
            id="edit-task-description"
            labelText="Description"
            value={editNote?.description}
            onChange={(event) => {
              setEditNote({
                ...editNote!,
                description: (event.target as HTMLInputElement).value,
              });
            }}
          />
        </Modal>,
        document.body
      )}
    </>
  );
}

export default NotesList;
