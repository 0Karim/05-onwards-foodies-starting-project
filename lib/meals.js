import fs from 'node:fs';
import sql from 'better-sqlite3';
import xss from 'xss';
import slugify from 'slugify';
import { redirect } from 'next/navigation';

const db = sql('meals.db');

export function getMeal(slug) {
    const statement = db.prepare('SELECT * FROM meals WHERE slug = ?');
    return statement.get(slug);
}

export async function getAllMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const statement = db.prepare('SELECT * FROM meals');
    // throw new Error('Failed to load meals');
    const meals = statement.all();
    return meals;
}


export async function saveMeal(meal){
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    console.log(meal.image);

    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error('saving image failed')
        }
    });
    meal.image = `/images/${filename}`;
    const statement = db.prepare('INSERT INTO meals (slug, title, summary, instructions, image, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)');
    statement.run(meal.slug, meal.title, meal.summary, meal.instructions, meal.image, meal.creator, meal.creator_email);
    redirect('/meals');
}

