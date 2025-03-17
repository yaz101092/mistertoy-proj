import { toyService } from '../../service/toy.service.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UNDO_TOYS, UPDATE_TOY } from  './reducers/toy.reducer.js'
import { store } from './store.js'
import { toys } from "../../assets/data/toys.js";

// export function loadToys() {
//     const filterBy = store.getState().toyModule.filterBy
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//     return toyService.query(filterBy)
//         .then(toys => {
//             store.dispatch({ type: SET_TOYS, toys })
//         })
//         .catch(err => {
//             console.log('toy action -> Cannot load toys', err)
//             throw err
//         })
//         .finally(() => {
//             store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//         })
// }
export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy;
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });

    return new Promise((resolve) => {
        setTimeout(() => { // מדמה טעינה מהשרת
            let filteredToys = [...toys];

            if (filterBy?.txt) {
                const regExp = new RegExp(filterBy.txt, "i");
                filteredToys = filteredToys.filter(toy => regExp.test(toy.name));
            }

            if (filterBy?.maxPrice) {
                filteredToys = filteredToys.filter(toy => toy.price <= filterBy.maxPrice);
            }

            store.dispatch({ type: SET_TOYS, toys: filteredToys });
            resolve(filteredToys);
        }, 500);
    })
    .catch(err => {
        console.error("toy action -> Cannot load toys", err);
        throw err;
    })
    .finally(() => {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    });
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: UNDO_TOYS })
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}


export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then((savedToy) => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}