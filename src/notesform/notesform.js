import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import './noteform.css';

class Noteform extends Component {

    constructor(props){
        super(props);

        this.state={
           newnote:'',
        };

        this.handleInput=this.handleInput.bind(this);
        this.writeNote=this.writeNote.bind(this);
    }

    handleInput(evnt){
        console.log(evnt.target.value);

        this.setState({
            newnote:evnt.target.value,
        });
    };

    writeNote(evnt){
        this.props.addNote(this.state.newnote);
        this.setState({
            newnote:'',
        });
    };

    render(){
        return (
            <div className='inputcard' >
                <input style={{margin:'10px',borderRadius:'18px',width:'69%',fontSize:'130%',paddingLeft:'20px'}} placeholder="write here" value={this.state.newnote} onChange={this.handleInput}/>
                <button style={{margin:'10px',borderRadius:'28px',width:'8%',fontSize:'150%',fontWeight:'bold',fontFamily:'monospace'}} className='submitbutton' onClick={this.writeNote}>Add Note</button>
            </div>
        );
    }
}

Noteform.protoType={
    noteContent: PropTypes.string,
};

export default Noteform;
