export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h2>Toy Name: {toy.name}</h2>
            <h4>Toy Price: {toy.price}</h4>
            <img src={`../assets/img/${toy.name}.png`} alt="" />
        </article>
    )
}
