import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouterDOM



export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    const hasUnsavedChanges = useRef(false)
    useConfirmTabClose(hasUnsavedChanges.current)

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.get(params.toyId)
            .then(setToyToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
        hasUnsavedChanges.current = true
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((savedToy) => {
                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.log('err:', err)
            })
    }

    const { name, price } = toyToEdit

    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Max Speed:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <button>Save</button>
            </form>
            <SaveButton /> 
            <StatusBar />      
        </section>
    )
}

function StatusBar() {
    const isOnline = useOnlineStatus()
    return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}

function SaveButton() {
    const isOnline = useOnlineStatus()

    function handleSaveClick() {
        console.log('Progress saved')
    }

    return (
        <button disabled={!isOnline} onClick={handleSaveClick}>
            {isOnline ? 'Save progress' : 'Reconnecting...'}
        </button>
    )
}