const PersonForm = (props) => {
    return (
        <form onSubmit={props.submithandler}>
            <div>
                <p>name: <input value={props.name} onChange={props.namehandler}/></p>
                <p>number: <input value={props.number} onChange={props.numberhandler} /></p>
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default PersonForm