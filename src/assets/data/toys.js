const labels = ['Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Battery Powered']
function getRandomDate() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return new Date(oneYearAgo.getTime() + Math.random() * (Date.now() - oneYearAgo.getTime())).getTime();
}



export const toys = [
    {
        _id: 't101',
        name: 'Doll',
        imgUrl: '/images/Doll.jpg',
        price: 139,
        labels: 'Doll',
        createdAt: getRandomDate(),
        inStock: true,
    },
    {
        _id: 't102',
        name: 'Puzzle',
        imgUrl: '/images/Puzzle.jpg',
        price: 99,
        labels: 'Puzzle',
        createdAt: getRandomDate(),
        inStock: true,
    },
    {
        _id: 't103',
        name: 'Lego Set',
        imgUrl: '/images/LegoSet.jpg',
        price: 75,
        labels:'Art',
        createdAt: getRandomDate(),
        inStock: false,
    },
    {
        _id: 't104',
        name: 'Remote Control Car',
        imgUrl: '/images/RemoteControlCar.jpg',
        price: 154,
        labels: 'Battery Powered',
        createdAt: getRandomDate(),
        inStock: true,
    },
    {
        _id: 't105',
        name: 'Musical Keyboard Toy',
        imgUrl: '/images/MusicalKeyboardToy.jpg',
        price: 208,
        labels: 'Battery Powered',
        createdAt: getRandomDate(),
        inStock: true,
    },
    {
        _id: 't106',
        name: 'Box Game',
        imgUrl: '/images/BoxGame.jpg',
        price: 189,
        labels:'Box game',
        createdAt: getRandomDate(),
        inStock: false,
    },
    {
        _id: 't107',
        name: 'TeedyBear',
        imgUrl: '/images/TeedyBear.jpg',
        price: 88,
        labels: 'Baby',
        createdAt: getRandomDate(),
        inStock: true,
    }
]