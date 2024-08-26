import AddFiles from "./AddFiles.jsx"

function HomePage() {

    return (
        <>
            <h1>Welcome to the Hamster network</h1>

            <img src={`${process.env.PUBLIC_URL}/hamster_logo.webp`} style={{width: '20rem'}}></img>

        </>
    )
};

export default HomePage