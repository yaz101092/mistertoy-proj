import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function ToyIndex() {

    const [toys, setToys] = useState(null)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)

    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        setSearchParams(filterBy)
        toyService.query(filterBy)
            .then(toys => setToys(toys))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        toyService.remove(toyId)
            .then(() => {
                setToys(prevToys => prevToys.filter(toy => toy._id !== toyId))
                showSuccessMsg(`Toy removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove toy ' + toyId)
            })
    }

    if (!toys) return <div>Loading...</div>
    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <Link to="/toy/edit" >Add Toy</Link>
            <h2>Toys List</h2>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            <hr />
            <h2>Toys Table</h2>
            <div style={{width: '60%', margin: 'auto'}}>
                <DataTable toys={toys} onRemoveToy={onRemoveToy} />
            </div>
        </section>
    )
}