import { filterChange } from "../reducers/filterReducer"
import { useDispatch, useSelector } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    
    const handleChange = (event) => {
        console.log('handle filter change')
        dispatch(filterChange(event.target.value))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div stype = {style}>
            filter <input value={filter} onChange={handleChange} />
        </div>
    )
}

export default Filter