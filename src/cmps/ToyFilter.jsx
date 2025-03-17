// import { useState, useEffect } from "react";

// export function ToyFilter({ filterBy, onSetFilterBy }) {

//     const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

//     useEffect(() => {
//         // Notify parent
//         onSetFilterBy(filterByToEdit)
//     }, [filterByToEdit])

//     function handleChange({ target }) {
//         const field = target.name
//         let value = target.value

//         switch (target.type) {
//             case 'number':
//             case 'range':
//                 value = +value || ''
//                 break

//             case 'checkbox':
//                 value = target.checked
//                 break

//             default: break
//         }

//         setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
//     }

//     // Optional support for LAZY Filtering with a button
//     function onSubmitFilter(ev) {
//         ev.preventDefault()
//         onSetFilterBy(filterByToEdit)
//     }

//     // function handleTxtChange({ target }) {
//     //     const value = target.value
//     //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
//     // }

//     // function handleMaxPriceChange({ target }) {
//     //     const value = target.value
//     //     setFilterByToEdit(prevFilter => ({ ...prevFilter, maxPrice: value }))
//     // }


//     const { txt, maxPrice } = filterByToEdit
//     return (
//         <section className="toy-filter">
//             <h2>Filter Toys</h2>
//             <form onSubmit={onSubmitFilter}>
//                 <label htmlFor="txt">Name: </label>
//                 <input value={txt} onChange={handleChange}
//                     type="text" placeholder="By Name" id="txt" name="txt"
//                 />
//                 <label htmlFor="maxPrice">Max Price: </label>
//                 <input value={maxPrice} onChange={handleChange}
//                     type="number" placeholder="By Max Price" id="maxPrice" name="maxPrice"
//                 />

//                 <button hidden>Set Filter</button>
//             </form>
//         </section>
//     )
// }

// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js";

// export function ToyFilter() {
//     const dispatch = useDispatch();
//     const filterBy = useSelector((state) => state.toyModule.filterBy);

//     const [filter, setFilter] = useState(filterBy);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const labels = ["Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"];

//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             dispatch({ type: SET_FILTER_BY, filterBy: filter });
//         }, 300);
//         return () => clearTimeout(timeoutId);
//     }, [filter]);

//     // ✅ סגירת dropdown בלחיצה מחוץ
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsDropdownOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     function handleChange({ target }) {
//         let { name, value, type } = target;
//         if (type === "number") value = +value || "";
//         if (name === "inStock") value = value === "all" ? undefined : value === "true";

//         setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
//     }

//     function handleLabelChange(label) {
//         setFilter((prevFilter) => {
//             const updatedLabels = prevFilter.labels?.includes(label)
//                 ? prevFilter.labels.filter((l) => l !== label)
//                 : [...(prevFilter.labels || []), label];

//             return { ...prevFilter, labels: updatedLabels };
//         });
//     }

//     return (
//         <section className="toy-filter">
//             <h3>Filter Toys</h3>
//             <input
//                 type="text"
//                 name="txt"
//                 placeholder="Search by name..."
//                 value={filter.txt || ""}
//                 onChange={handleChange}
//             />

//             <select name="inStock" onChange={handleChange} value={filter.inStock ?? "all"}>
//                 <option value="all">All</option>
//                 <option value="true">In Stock</option>
//                 <option value="false">Out of Stock</option>
//             </select>

//             <select name="sortBy" onChange={handleChange} value={filter.sortBy || ""}>
//                 <option value="">Sort by</option>
//                 <option value="name">Name</option>
//                 <option value="price">Price</option>
//                 <option value="createdAt">Created Date</option>
//             </select>

//             {/* ✅ Dropdown לבחירת Labels */}
//             <div className="dropdown" ref={dropdownRef}>
//                 <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown-button">
//                     Select Labels
//                 </button>

//                 {isDropdownOpen && (
//                     <div className="dropdown-menu">
//                         {labels.map((label) => (
//                             <label key={label} className="dropdown-item">
//                                 <input
//                                     type="checkbox"
//                                     value={label}
//                                     checked={filter.labels?.includes(label) || false}
//                                     onChange={() => handleLabelChange(label)}
//                                 />
//                                 {label}
//                             </label>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }


import { useState, useEffect, useRef } from "react";

export function ToyFilter({ filterBy, onSetFilterBy }) {
    const [filter, setFilter] = useState(filterBy);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const labels = ["Box game", "Art", "Baby", "Doll", "Puzzle", "Battery Powered"];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSetFilterBy(filter);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [filter]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    function handleChange({ target }) {
        let { name, value } = target;
    
        if (name === "inStock") {
            if (value === "all") value = undefined;  // כל הצעצועים
            else if (value === "true") value = true; // במלאי
            else if (value === "false") value = false; // לא במלאי
        }
    
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
    }

    function handleLabelChange(label) {
        setFilter(prevFilter => {
            const updatedLabels = prevFilter.labels?.includes(label)
                ? prevFilter.labels.filter(l => l !== label)
                : [...(prevFilter.labels || []), label];

            return { ...prevFilter, labels: updatedLabels };
        });
    }

    return (
        <section className="toy-filter">
            <h3>Filter Toys</h3>

            <input type="text" name="txt" placeholder="Search by name..." value={filter.txt || ""} onChange={handleChange} />

            <select name="inStock" onChange={handleChange} value={filter.inStock ?? "all"}>
                <option value="all">All</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
            </select>

            
            <select name="sortBy" onChange={handleChange} value={filter.sortBy || ""}>
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created Date</option>
            </select>

            <div className="dropdown" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown-button">
                    Select Labels
                </button>

                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        {labels.map(label => (
                            <label key={label} className="dropdown-item">
                                <input
                                    type="checkbox"
                                    value={label}
                                    checked={filter.labels?.includes(label) || false}
                                    onChange={() => handleLabelChange(label)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}


