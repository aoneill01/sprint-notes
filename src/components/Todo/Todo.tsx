import { transformDescription } from "@/helpers/markdownHelpers";
import { Add, Edit, TrashCan } from "@carbon/icons-react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  TextInput,
} from "@carbon/react";
import { useId, useState, type FC } from "react";
import { createPortal } from "react-dom";
import Markdown from "react-markdown";

export type Task = {
  id: string;
  description: string;
  completed: boolean;
  date: string;
};

type TodoProps = {
  tasks: Task[];
  newDate: string;
  onAddTask: (task: Omit<Task, "id">) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: Task) => void;
};

const Todo: FC<TodoProps> = ({
  tasks,
  newDate,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}) => {
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const prefix = useId();

  const isValidNewTask = () => newTask.trim().length > 0;
  const addTask = () => {
    if (!isValidNewTask()) return;

    onAddTask({
      date: newDate,
      description: newTask.trim(),
      completed: false,
    });
    setNewTask("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <TextInput
          id={prefix + "-task-input"}
          labelText="Label text"
          hideLabel
          value={newTask}
          onChange={(event) =>
            setNewTask((event.target as HTMLInputElement).value)
          }
          onKeyUp={(event) => {
            if (event.key === "Enter") addTask();
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
          iconDescription="Add task"
          disabled={!isValidNewTask()}
          onClick={addTask}
        />
      </div>
      <div style={{ marginBottom: "32px" }}>
        {tasks.map((task, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 16,
            }}
          >
            <CheckboxGroup legendText="">
              <Checkbox
                id={`${prefix}-task-${i}`}
                key={i}
                labelText={task.description}
                hideLabel
                checked={task.completed}
                onChange={(_, { checked }) =>
                  onUpdateTask({ ...task, completed: checked })
                }
              />
            </CheckboxGroup>
            <div style={{ flex: 1 }}>
              <Markdown>{transformDescription(task.description)}</Markdown>
            </div>
            <div>
              <Button
                size="sm"
                kind="ghost"
                hasIconOnly
                renderIcon={Edit}
                iconDescription="Edit task"
                onClick={() => setEditTask({ ...task })}
              />
              <Button
                size="sm"
                kind="danger--ghost"
                hasIconOnly
                renderIcon={TrashCan}
                iconDescription="Delete task"
                onClick={() => onDeleteTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {createPortal(
        <Modal
          onRequestClose={() => {
            setEditTask(null);
          }}
          onRequestSubmit={() => {
            onUpdateTask(editTask!);
            setEditTask(null);
          }}
          modalHeading="Edit task description"
          primaryButtonText="Update"
          secondaryButtonText="Cancel"
          aria-label="Task editor"
          open={editTask !== null}
        >
          <TextInput
            data-modal-primary-focus
            id="edit-task-description"
            labelText="Task"
            value={editTask?.description}
            onChange={(event) => {
              setEditTask({
                ...editTask!,
                description: (event.target as HTMLInputElement).value,
              });
            }}
          />
        </Modal>,
        document.body
      )}
    </>
  );
};

export default Todo;
