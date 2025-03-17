import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom';
import { toyType } from "../assets/data/toyPropTypes.js";


export function ToyList({ toys, onRemoveToy }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section>
                        <button onClick={() => onRemoveToy(toy._id)} className="close">X</button>
                        <nav className="toy-nav">
                            <Link to={`/toy/${toy._id}`}><button>Details</button></Link>
                            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                        </nav>
                        {/* <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button> */}
                    </section>
                </li>
            )}
        </ul>
    )
}

ToyList.toyType = {toy: toyType}