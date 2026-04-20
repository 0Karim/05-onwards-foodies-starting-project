'use server'
import { saveMeal } from "./meals";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

function isInvalidEmail(email) {
    return !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMeal(meal) {
    if (isInvalidText(meal.creator)) return 'Name is required.';
    if (isInvalidEmail(meal.creator_email)) return 'A valid email is required.';
    if (isInvalidText(meal.title)) return 'Title is required.';
    if (isInvalidText(meal.summary)) return 'Summary is required.';
    if (isInvalidText(meal.instructions)) return 'Instructions are required.';
    if (!meal.image || meal.image.size === 0) return 'An image is required.';
    return null;
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    const error = validateMeal(meal);
    if (error) return { error };

    await saveMeal(meal);
}