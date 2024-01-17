import axios from 'axios'
import { useState, useEffect } from 'react'
import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'

let maxid = 0

function App(props) {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    //axios
    //.get('/persons')
    //.then((response) => setPerson(response.data))
    personsService
    .getAll()
    .then(persons => {
      console.log(persons)
      persons.forEach(m => maxid = maxid > m.id ? maxid : m.id) 
      setPerson(persons)
    })
    .catch(err =>{
      console.log(err)
    })
  },[])

  function handleNumberChanged(event) {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  function handleNameChanded(event) {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  function handleFilterChanged(event) {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const sendNotification = (status, msg) => {
    const notification = {
      status:status,
      message:msg
    }
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  function deleteOne (dperson) {
    if (!window.confirm(`Delete ${dperson.name} ?`)) {
      return
    }
    const id = dperson.id
    console.log('deleteOne:', id)
    personsService
    .deletePerson(id)
    .then((data) => {
      console.log('delete ok:', id)
      const newPersons = person.filter(pp => pp.id != id)
      console.log('newPersons:', newPersons)
      setPerson(newPersons)
    })
  }
  
  function addNew(event) {
    event.preventDefault()
    console.log('button clicked', event.target)
    const exsit = person.find((pe) => pe.name == newName)
    if (exsit) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        exsit.number = newNumber
        personsService
        .update(exsit.id, exsit)
        .then(data => {
          setPerson(person.map(pp => pp.name != data.name ? pp : data))
        })
        .catch(error => {
          console.error(error)
          if (error.response.status == 404) {
              sendNotification('error', `Information of ${newName} has alrady been removed from server`)
          }
        })
      }
      return
    }
    
    const newP = {name: newName, number: newNumber, id: ++maxid}
    personsService
    .create(newP)
    .then(data => {
      setPerson(person.concat(data))
      setNewName('')
      setNewNumber('')
      sendNotification('success', `Added ${data.name}`)
    })
  }

  const personToShow = newFilter.trim().length == 0 
                      ? person
                      : person.filter(ps => ps.name.startsWith(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification = {notification} />
      <Filter value = {newFilter} handler = {handleFilterChanged} />
      <h3>add a new</h3>
      <PersonForm name = {newName} number = {newNumber} namehandler = {handleNameChanded}
        numberhandler = {handleNumberChanged} submithandler = {addNew} />
      <h3>Numbers</h3>
      <Persons 
        persons = {personToShow}
        deleteOne={deleteOne}
      />
    </div>
  )
}

export default App