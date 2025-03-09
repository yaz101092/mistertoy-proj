import { useState, useEffect } from "react";

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    // function handleTxtChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMaxPriceChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, maxPrice: value }))
    // }


    const { txt, maxPrice } = filterByToEdit
    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Name: </label>
                <input value={txt} onChange={handleChange}
                    type="text" placeholder="By Name" id="txt" name="txt"
                />
                <label htmlFor="maxPrice">Max Price: </label>
                <input value={maxPrice} onChange={handleChange}
                    type="number" placeholder="By Max Price" id="maxPrice" name="maxPrice"
                />

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}
