const Person = ({person, deleteHandler}) => {
  console.log('Person',person)
  // console.log('deleteHandler', deleteHandler)
  return (
    <h4>
      {person.name} {person.number}
      <button onClick={deleteHandler}>delete</button>
    </h4>
  )
}

const Persons = ({persons, deleteOne}) => {
  console.log('Persons', persons)
  // console.log('deleteOne', deleteOne)
  return (
    <div>
    {persons.map(per => <Person key={per.id} person = {per} deleteHandler={() => deleteOne(per)} />)}
    </div>
  )
}

export default Persons