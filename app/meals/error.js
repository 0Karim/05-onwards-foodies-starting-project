'use client'
export default function Error({error}){
    return(
        <main className="error">
            <h1>Failed to load meals</h1>             
            <p>Failed to load meals. Please try again later.</p>
        </main>
    );
}