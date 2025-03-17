// import { ToyFilter } from "../cmps/ToyFilter.jsx"
// import { ToyList } from "../cmps/ToyList.jsx"
// // import { DataTable } from "../cmps/data-table/DataTable.jsx"
// import { toyService } from "../services/toy.service.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

// // const { useState, useEffect } = React
// // const { Link, useSearchParams } = ReactRouterDOM
// import { useState, useEffect } from "react";
// import { Link, useSearchParams } from "react-router-dom";

// export function ToyIndex() {

//     const [toys, setToys] = useState(null)

//     // Special hook for accessing search-params:
//     const [searchParams, setSearchParams] = useSearchParams()

//     const defaultFilter = toyService.getFilterFromSearchParams(searchParams)

//     const [filterBy, setFilterBy] = useState(defaultFilter)

//     useEffect(() => {
//         setSearchParams(filterBy)
//         toyService.query(filterBy)
//             .then(toys => setToys(toys))
//             .catch(err => {
//                 console.eror('err:', err)
//                 showErrorMsg('Cannot load toys')
//             })
//     }, [filterBy])

//     function onRemoveToy(toyId) {
//         toyService.remove(toyId)
//             .then(() => {
//                 setToys(prevToys => prevToys.filter(toy => toy._id !== toyId))
//                 showSuccessMsg(`Toy removed`)
//             })
//             .catch(err => {
//                 console.log('err:', err)
//                 showErrorMsg('Cannot remove toy ' + toyId)
//             })
//     }

//     if (!toys) return <div>Loading...</div>
//     return (
//         <section className="toy-index">
//             <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
//             <Link to="/toy/edit" >Add Toy</Link>
//             <h2>Toys List</h2>
//             <ToyList toys={toys} onRemoveToy={onRemoveToy} />
//             <hr />
//             <h2>Toys Table</h2>
//         </section>
//     )
// }

// import { ToyFilter } from "../cmps/ToyFilter.jsx";
// import { ToyList } from "../cmps/ToyList.jsx";
// // import { DataTable } from "../cmps/data-table/DataTable.jsx";
// import { toyService } from  '../services/toy.service.js'
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
// import { SET_TOYS ,SET_FILTER_BY, REMOVE_TOY, UPDATE_TOY } from "../store/reducers/toy.Reducer.js";
// // import { saveToy } from "../store/actions/toy.actions.js"


// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useSearchParams } from 'react-router-dom';

// export function ToyIndex() {
//     const toys = useSelector(storeState => storeState.toyModule.toys);
//     const filterBy = useSelector(storeState => storeState.toyModule.filterBy);
//     const isLoading = useSelector(storeState => storeState.toyModule.isLoading);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         toyService.query(filterBy)
//             .then(toys =>dispatch({ type: "SET_TOYS", toys }))
//             .catch(() => showErrorMsg("Cannot load toys"));
//     }, [filterBy, dispatch]);

//     function onSetFilter(filterBy) {
//         dispatch({ type: SET_FILTER_BY, filterBy });
//     }

//     function onRemoveToy(toyId) {
//         console.log("Trying to remove toy with ID:", toyId);
//         const isConfirmed = confirm("Are you sure you want to remove?");
//         if (!isConfirmed) return;
//         toyService.remove(toyId)
//             .then(() => dispatch({ type: REMOVE_TOY, toyId }))
//             .catch(err => {
//                 console.error("Cannot remove toy", err);
//                 showErrorMsg("Cannot remove toy");
//             });
//     }

//     // function onToggleToy(toy) {
//     //     const toyToSave = { ...toy, isDone: !toy.isDone };
//     //     toyService.save(toyToSave)
//     //         .then(savedToy => {
//     //             dispatch({ type: UPDATE_TOY, toy: savedToy });
//     //             if (savedToy.isDone) {
//     //                 increaseBalance(10, "Completed a toy");
//     //                 showSuccessMsg("Toy completed! Balance increased.");
//     //             }
//     //         })
//     //         .catch(err => {
//     //             console.error("Cannot toggle toy", err);
//     //             showErrorMsg("Cannot toggle toy");
//     //         });
//     // }

//     // function onSetToyStyle(toy, color) {
//     //     updateToyColor(toy, color);
//     // }

//     if (!toys) return <div>Loading...</div>;
//     return (
//         <section className="toy-index">
//             <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
//             <div>
//                 <Link to="/toy/edit" className="btn">Add Toy</Link>
//             </div>
//             <h2>Toys List</h2>
//             <ToyList toys={toys} onRemoveToy={onRemoveToy} />
//             {/* <hr />
//             <h2>Toys Table</h2>
//             <div style={{ width: "60%", margin: "auto" }}>
//                  toys={toys} onRemoveToy={onRemoveToy} 
//             </div> */}
//         </section>
//     );
// }

import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { ToyList } from "../cmps/ToyList.jsx";
import { toyService } from '../services/toy.service.js';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { SET_TOYS, SET_FILTER_BY, REMOVE_TOY } from "../store/reducers/toy.reducer.js";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toyType } from "../assets/data/toyPropTypes.js"

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys);
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy);
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        loadToys();
    }, [filterBy]);

    function loadToys() {
        toyService.query(filterBy)
            .then(toys => dispatch({ type: SET_TOYS, toys }))
            .catch(() => showErrorMsg("Cannot load toys"));
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy });
    }

    function onRemoveToy(toyId) {
        console.log("Trying to remove toy with ID:", toyId);
        const isConfirmed = confirm("Are you sure you want to remove?");
        if (!isConfirmed) return;
        toyService.remove(toyId)
            .then(() => {
                dispatch({ type: REMOVE_TOY, toyId });
                showSuccessMsg("Toy removed successfully");
            })
            .catch(err => {
                console.error("Cannot remove toy", err);
                showErrorMsg("Cannot remove toy");
            });
    }

    function getFilteredToys() {
        return toys
            .filter(toy => 
                (!filterBy.txt || toy.name.toLowerCase().includes(filterBy.txt.toLowerCase())) &&
                (filterBy.inStock === undefined || toy.inStock === filterBy.inStock) && // 🔥 תיקון הסינון
                (!filterBy.labels?.length || filterBy.labels.every(label => toy.labels.includes(label)))
            )
            .sort((a, b) => {
                if (!filterBy.sortBy) return 0;
                if (filterBy.sortBy === "name") return a.name.localeCompare(b.name);
                if (filterBy.sortBy === "price") return a.price - b.price;
                if (filterBy.sortBy === "createdAt") return a.createdAt - b.createdAt;
            });
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <section className="toy-index">
            <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
            <div>
                <Link to="/toy/edit" className="btn">Add Toy</Link>
            </div>
            <h2>Toys List</h2>
            <ToyList toys={getFilteredToys()} onRemoveToy={onRemoveToy} />
        </section>
    );
}

ToyIndex.propTypes = {toy: toyType}