import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

class Persons extends Component {
    state = {
        persons: []
    }

    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        this.setState( ( prevState ) => {
            return { persons: prevState.persons.concat(newPerson)}
        } );
    }

    personDeletedHandler = (personId) => {
        this.setState( ( prevState ) => {
            return { persons: prevState.persons.filter(person => person.id !== personId)}
        } );
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.addPersonDispatcher} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.removePersonDispatcher(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        persons: state.persons
    };
};

const dispatchToReducer = dispatch => {
    return {
        addPersonDispatcher: (name, age) => dispatch({type: actionTypes.ADD, payload: {name: name, age: age}}),
        removePersonDispatcher: (id) => dispatch({type: actionTypes.REMOVE, value: id})
    }
}

export default connect(mapPropsToState, dispatchToReducer)(Persons);