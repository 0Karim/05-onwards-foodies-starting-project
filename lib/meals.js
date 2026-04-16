import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getAllMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const statement = db.prepare('SELECT * FROM meals');
    // throw new Error('Failed to load meals');
    const meals = statement.all();
    return meals;
}

