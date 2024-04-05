/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import phoneService from './services/Phonebook'

const App = () => {
  const [searchName, setSearchName] = useState('')                        // Create a state variable for search Name in filter
  const [persons, setPersons] = useState([                                // Create a state variable for phone book array 
    {
      id: 1,
      name: 'Arto Hellas',
      number: "040-1234567",
    }
  ])
  const [newName, setNewName] = useState('')                              // Create a state variable for adding Name to persons phone book
  const [newNumber, setNewNumber] = useState('')                          // Create a state variable for adding Number to persons phone book

  const newNameHandler = (event) => {                                     // Function to add person to phone book
    event.preventDefault();
    const Obj = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName && window.confirm(`${newName} is already added to phonebook, replace the old number with the new number?`))) {
      const identity = persons.filter(p => p.name === newName)[0].id;
      const newObj0 = {
        ...Obj,
        id: identity
      };
      phoneService.update(identity, newObj0).then(
        setPersons(persons.map(p => p.id !== identity ? p : newObj0))
      )
    }
    else {
      const newObj = {
        ...Obj,
        id: (persons.length + 1).toString()
      }
      phoneService.create(newObj).then(
        response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        }
      )
    }
  }

  const setNewNameHandler = (event) => {                                 // Function to get value in NewName state 
    setNewName(event.target.value)
  }

  const setNewNumberHandler = (event) => {                               // Function to get value in NewNumber state
    setNewNumber(event.target.value)
  }

  const setSearchNameHandler = (event) => {                              // Function to get value in filter search bar
    setSearchName(event.target.value)
  }

  const deletePerson = (id) => {                                         // Function to remove person from person phone book state
    const p = persons.filter(person => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${p[0].name}?`)) {
      phoneService.del(id).then(
        setPersons(persons.filter(person => person.id !== id))
      ).catch(error => {
        if (error.response) {
          console.error(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
        console.log(error.config);

      });
    }
  }


  useEffect(() => {                                                      // Use Effect is used to synchronize a component with an external system 
    phoneService.getAll().then(
      response => setPersons(response)
    )
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName} onChange={setSearchNameHandler} />
      </div>
      <div>
        <ul>
          {persons.filter(person => person.name && person.name.includes(searchName)).map(person => (
            <li key={person.id}>{person.name} {person.number}</li>

          ))}
        </ul>
      </div>
      <form onSubmit={newNameHandler}>
        <div>
          name: <input value={newName} onChange={setNewNameHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={setNewNumberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <div>
            <li key={person.id}>{person.name} {person.number}</li>
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App
