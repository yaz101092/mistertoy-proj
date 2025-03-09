import { toyService } from "../service/toy.service.js"
import { showErrorMsg } from "../service/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [params.toyId])


    function loadToy() {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/toy')
        // navigate(-1)
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy Name: {toy.name}</h1>
            <h1>Toy Speed: {toy.price}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back</button>
            <div>
                <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
            </div>
        </section>
    )
}