import React, {useState, useEffect} from "react";

export function CreateForm({addNote}) {
  const [formInfo, setFormInfo] = useState({title:"",body:""})

  function updateInput(e){
    let target = e.target;

    setFormInfo(prev => ({...prev, [target.name]:target.value }))

  }

  return(
    <form id="input-box" onSubmit={(e)=>{e.preventDefault()}} >
      <h3>Create new notes</h3>
      <div className="input">
        <label htmlFor="title-input">Title</label>
        <input type="text" id="title" name="title" onChange={updateInput} />
      </div>

      <div className="input">
        <label htmlFor="body-input">Body</label>
        <textarea type="text" id="body" name="body" onChange={updateInput}/>
      </div>

      <div className="btn-block">
        <button onClick={()=> addNote(formInfo.title, formInfo.body)}>+ Create Note</button>
      </div>
    </form>
  )
}

export function Note({note}){

  return(
    <li className="note">
      <h4>{note.title}</h4>
      <p>
        {note.body}
      </p>
      <i>{note.date}</i>
    </li>
  )
}
