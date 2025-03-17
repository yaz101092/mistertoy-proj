
// import { loadFromStorage, makeId, saveToStorage} from '../services/util.service.js'
import { storageService } from './async-storage.service.js'
import { toys as defaultToys } from '../assets/data/toys.js'
import { utilService } from '../services/util.service.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getSpeedStats,
    // getNameStats,
}

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }

            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '') {
    return { name, price }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function getSpeedStats() {
    return storageService.query(TOY_KEY)
        .then(toys => {
            const toyCountBySpeedMap = _getToyCountBySpeedMap(toys)
            const data = Object.keys(toyCountBySpeedMap).map(speedName => ({ title: speedName, value: toyCountBySpeedMap[speedName] }))
            return data
        })

}

// function getNameStats() {
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             const toyCountByNameMap = _getToyCountByNameMap(toys)
//             const data = Object.keys(toyCountByNameMap)
//                 .map(name =>
//                 ({
//                     title: name,
//                     value: Math.round((toyCountByNameMap[name] / toys.length) * 100)
//                 }))
//             return data
//         })
// }

// function _createToys() {
//     let toys = utilService.loadFromStorage(TOY_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         const names = ['Puzzle', 'Lego Set', 'Doll', 'Remote Control Car', 'Musical Keyboard Toy', 'Box Game', 'Teedy Bear',]
//         for (let i = 0; i < 20; i++) {
//             const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
//             toys.push(_createToy(name, utilService.getRandomIntInclusive(20, 300)))
//         }
//         utilService.saveToStorage(TOY_KEY, toys)
//     }
// }

function _createToys() {
    let toysInStorage = utilService.loadFromStorage("toyDB");
    if (!toysInStorage || toysInStorage.length === 0) {
        const updatedToys = defaultToys.map((toys, i) => ({
            ...toys,
            // imgUrl: `/images/${i + 1}.jpg`
        }))
        utilService.saveToStorage(TOY_KEY, updatedToys)
    }
}



// function _createToy(name, price = 100) {
//     const toy = getEmptyToy(name, price)
//     toy._id = utilService.makeId()
//     return toy
// }

// function _createToy(name, price = 100) {
//     return {
//         _id: utilService.makeId(),
//         name,
//         imgUrl: 'https://via.placeholder.com/150', // URL זמני לתמונה
//         price,
//         labels: _getRandomLabels(),
//         createdAt: Date.now(),
//         inStock: Math.random() > 0.5, // חצי מהצעצועים יהיו במלאי
//     }
// }

// function _getRandomLabels() {
//     const numLabels = utilService.getRandomIntInclusive(1, 3) // כל צעצוע יקבל 1-3 תוויות
//     const shuffledLabels = labels.sort(() => 0.5 - Math.random()) // ערבוב אקראי של התוויות
//     return shuffledLabels.slice(0, numLabels)
// }

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

function _getToyCountBySpeedMap(toys) {
    const toyCountBySpeedMap = toys.reduce((map, toy) => {
        if (toy.price < 120) map.slow++
        else if (toy.price < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return toyCountBySpeedMap
}

// function _getToyCountByNameMap(toys) {
//     const toyCountByNameMap = toys.reduce((map, toy) => {
//         if (!map[toy.name]) map[toy.name] = 0
//         map[toy.name]++
//         return map
//     }, {})
//     return toyCountByNameMap
// }
