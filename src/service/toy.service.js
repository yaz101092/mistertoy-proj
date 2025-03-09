import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

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
    _createBooks
}
// For Debug (easy access from console):
window.toyService = toyService

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

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = ['audu', 'fiak', 'subali', 'mitsu']
        for (let i = 0; i < 20; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            toys.push(_createToy(name, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price = 250) {
    const toy = getEmptyToy(name, price)
    toy._id = utilService.makeId()
    return toy
}

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
function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    console.log('books', books)
}
