'use server'
import { saveMeal } from "./meals";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

function isInvalidEmail(email) {
    return !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMeal(meal) {
    if (isInvalidText(meal.creator)) throw new Error('Invalid input: name is required.');
    if (isInvalidEmail(meal.creator_email)) throw new Error('Invalid input: a valid email is required.');
    if (isInvalidText(meal.title)) throw new Error('Invalid input: title is required.');
    if (isInvalidText(meal.summary)) throw new Error('Invalid input: summary is required.');
    if (isInvalidText(meal.instructions)) throw new Error('Invalid input: instructions are required.');
    if (!meal.image || meal.image.size === 0) throw new Error('Invalid input: an image is required.');
}

export async function shareMeal(formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    validateMeal(meal);
    await saveMeal(meal);
}