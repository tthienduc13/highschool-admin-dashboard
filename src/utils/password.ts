export const generatePassword = (): string => {
    const minLength = 8;
    const maxLength = 16;

    // Randomize password length within the given range
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    // Character sets
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?";
    const allChars = lowerCaseChars + upperCaseChars + digitChars + specialChars;

    // Helper to get a random character from a string
    const getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

    // Ensure at least one character from each required set
    const randomLower = getRandomChar(lowerCaseChars);
    const randomUpper = getRandomChar(upperCaseChars);
    const randomDigits = Array.from({ length: 3 }, () => getRandomChar(digitChars)).join("");
    const randomSpecial = getRandomChar(specialChars);

    // Fill the rest of the password with random characters
    const remainingChars = Array.from(
        { length: length - 5 }, // Already used 5 required characters
        () => getRandomChar(allChars)
    ).join("");

    // Combine and shuffle
    const password = randomLower + randomUpper + randomDigits + randomSpecial + remainingChars;
    return password.split("").sort(() => Math.random() - 0.5).join("");
};
