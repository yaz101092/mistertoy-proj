import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { Chat } from "../cmps/Chat.jsx"
import { NicePopup } from "../cmps/NicePopup.jsx";

// const { useState, useEffect } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false);
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
            {<nav className='toy-details-nav'>
            <Link to={`/toy/${toy.nextToyId}`}><button><i className="fa-solid fa-arrow-left"></i></button></Link>
            <Link to={`/toy/${toy.prevToyId}`}><button><i class="fa-solid fa-arrow-right"></i></button></Link>   
            </nav> }
            
            <h1>{toy.name}</h1>
            <img src={toy.imgUrl} alt={toy.name} className="toy-img"/>
            <h2>Price: {toy.price}</h2>
            <p><strong>Created At:</strong> {new Date(toy.createdAt).toLocaleDateString()}</p>
            <p><strong>Availability:</strong> {toy.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>
            {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p> */}
            <button onClick={onBack}>Back</button>
            <button className="chat-icon" onClick={() => setIsChatOpen(true)}>
                💬 Chat
            </button>

            {/* 🔹 פופאפ נפתח רק אם `isChatOpen` */}
            {isChatOpen && (
                <NicePopup
                    heading="Chat with us"
                    onClose={() => setIsChatOpen(false)}
                    footing={<button onClick={() => setIsChatOpen(false)}>Close</button>}
                >
                    <Chat />
                </NicePopup>
            )}


        </section>
    )
}
