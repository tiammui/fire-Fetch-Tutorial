import React, { useState, useEffect } from 'react';
import './style.css';

import { CreateForm, Note } from './components/components';

const LOCAL_STORAGE_KEY = 'key';

export default function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      {
        title: 'Example Notes',
        body: 'This is just an eample note to test my app',
        id: 6789,
        date: Date.now(),
        isDone: false,
      },
    ]
  );

  useEffect(() => {
    // Fetch notes from firebase
  }, []);

  function addNote(title, body) {
    // Validation
    if (!title || !body) {
      throw alert('Fill all input');
    }

    let newNote = {
      id: Date.now(),
      date: Date.now(),
      isDone: false,
      title,
      body,
    };

    setNotes((prev) => [...prev, newNote]);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }

  return (
    <div>
      <h1>My Notes of Life</h1>
      <CreateForm addNote={addNote} />
      <ul>
        {notes.map((note) => (
          <Note note={note} />
        ))}
      </ul>
    </div>
  );
}
