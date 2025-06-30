import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// clsx is a utility for constructing className strings conditionally.
// It simplifies the logic of writing conditional class names in React.

// without clsx
// const classes = `base-btn ${isPrimary ? 'btn-primary' : 'btn-secondary'} ${isLarge ? 'btn-large' : ''} ${className || ''}`;

// with clsx
// {
//   'btn-primary': isPrimary, // Include if isPrimary is true
//   'btn-secondary': !isPrimary, // Include if isPrimary is false
//   'btn-large': isLarge,       // Include if isLarge is true
// },


// export function cn(...inputs: ClassValue[]) {
//   // 1. First, clsx handles all the conditional logic.
//   // It might produce a string with conflicting classes, e.g., "p-4 bg-blue-500 p-6 bg-red-500"
//   const conditionalClasses = clsx(inputs);

//   // 2. Then, twMerge takes that string and resolves the conflicts.
//   // It cleans up the string, resulting in "p-6 bg-red-500"
//   return twMerge(conditionalClasses);
// }

