import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

import './style.css';
import { db } from './firebase.js';

import { CreateForm, Note } from './components/components';

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from firebase
    getDocs(collection(db, 'notes'))
      .then((snapshot) => {
        setNotes(() => []); // reset the default notes

        for (let i = 0; i < snapshot.docs.length; i++) {
          setNotes((prev) => [
            ...prev,
            { ...snapshot.docs[i].data(), id: snapshot.docs[i].id },
          ]);
        }
      })
      .catch(console.error);
  }, []);

  function addNote(title, body) {
    // Validation
    if (!title || !body) {
      throw alert('Fill all input');
    }

    let newNote = {
      date: serverTimestamp(),
      isDone: false,
      title,
      body,
    };

    addDoc(collection(db, 'notes'), newNote)
      .then((docRef) => {
        getDoc(doc(db, 'notes', docRef.id)).then((doc) => {
          setNotes((prev) => [...prev, { ...doc.data(), id: docRef.id }]);
        });
      })
      .catch(console.error);
  }

  function deleteNote(noteId) {
    deleteDoc(doc(db, 'notes', noteId)).then(() => {
      setNotes((prev) => prev.filter((note) => note.id != noteId));
      alert('Note deleted');
    });
  }

  return (
    <div>
      <h1>My Notes of Life</h1>
      <CreateForm addNote={addNote} />
      <ul>
        {!notes.length
          ? 'NO NOTES'
          : notes.map((note) => (
              <Note note={note} deleteNote={deleteNote} key={nanoid()} />
            ))}
      </ul>
    </div>
  );
}
