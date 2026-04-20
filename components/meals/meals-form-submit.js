'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  const {pending} = useFormStatus(); // This hook is used to track the status of the form submission. It can be used to show a loading state or handle errors during form submission.
   return <button disabled={pending}>
    {pending ? 'Submitting...' : 'Share Meal'}
   </button>
}