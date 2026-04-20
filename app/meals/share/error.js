'use client';

export default function ShareMealError({ error }) {
    return (
        <main className="error">
            <h1>Failed to share meal</h1>
            <p>{error.message}</p>
        </main>
    );
}
