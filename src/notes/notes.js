import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import logo from './close.png'
import './notes.css';

class Note extends Component {

    constructor(props){

        super(props);

        this.noteContent=this.props.noteContent;
        this.noteId=this.props.noteId;
        this.handleRemove=this.handleRemove.bind(this);

    }

    handleRemove(id){
     this.props.removeNote(id);
    }

    render(){
        return (
            <div className='indcard'>
                <span className='cancelbut' onClick={()=>this.handleRemove(this.noteId)}>
                    <img style={{height:'10px'}} src={logo} alt={'logo'}/>
                </span>
                <div>
                    <p>{this.noteContent}</p>
                    </div>
            </div>
        );
    }

}

Note.protoType={
    noteContent: PropTypes.string,
};

export default Note;
