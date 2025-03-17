import {toyType} from "../assets/data/toyPropTypes.js";

export function ToyPreview({ toy }) {
    // console.log("Loading image:", toy.imgUrl);
    return (
        <article className="toy-preview">
            <h3>{toy.name}</h3>
            <h4>Price: {toy.price}</h4>
            <img src={toy.imgUrl} alt="" />
            {/* <img src={toy.imgUrl} alt={toy.name} onError={(e) => console.error("Image not found:", e.target.src)} /> */}
        </article>
    )
}

ToyPreview.PropTypes = {toy: toyType}



