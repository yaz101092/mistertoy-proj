

export function About() {


    return (
        <section className="about">

            <article>
                <details onToggle={() => setIsActive(!isActive)} open={isActive}>
                    <summary>SUMMARY</summary>
                    <p>Learn more about us..</p>
                </details>
            </article>
        </section>
        )

}


