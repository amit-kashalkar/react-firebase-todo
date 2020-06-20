
import Noteform from './notesform/notesform';
import {DB_CONF} from './config/config';
import firebase from 'firebase/app';
import Note from './notes/notes';
import 'firebase/database';
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){

    super(props);

    this.aapp=!firebase.apps.length ? firebase.initializeApp(DB_CONF) : firebase.app();//if doesnt exit then initialise ; else open;
    this.db = this.aapp.database().ref().child('notes');//create a child names notes; 

    this.state={
      notes:[], //creating array
    }

    this.addNote=this.addNote.bind(this);
    this.removeNote=this.removeNote.bind(this);

  }

  componentWillMount(){

    const prev=this.state.notes;
    /* invoke when push or insert to db */
    this.db.on('child_added',snap=>{

      prev.push({
        id:snap.key,
        noteContent:snap.val().noteContent,
      })

      this.setState({
        notes:prev
      })

    })
     /* invoke when delete to db */
    this.db.on('child_removed',snap=>{
      //search for id
      for(var i=0;i<prev.length;i++)
      {
        if(prev[i].id===snap.key){
          prev.splice(i,1);
        }
      }

      this.setState({
        notes:prev
      })

    })

  }
  //add note function
  addNote(note){
    this.db.push().set({noteContent:note});
  }
  //delete note function
  removeNote(noteId){
    console.log("inside reomve");
    console.log(noteId);
    this.db.child(noteId).remove();
  }

  render(){
    return (
      <div className="App">
        <div className='maincard'>
          <div className='headerstyle'>
            ToDo List
          </div>
          <div >
          {
            this.state.notes.map((note)=>{
            return(
              <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote}/>
            );
            })
          } 
          </div>
          <Noteform addNote={this.addNote} />
        </div>  
      </div>
    );
  }
}

export default App;
