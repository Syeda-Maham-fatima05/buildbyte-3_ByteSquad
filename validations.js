// Check if field is empty
export const isEmpty = (value) => {
  return value.trim() === "";
};

// Validate email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate university email
export const isUniversityEmail = (email) => {
  return email.endsWith("@youruniversity.edu.pk");
  // Replace with your actual university domain
};

// Validate password
export const isStrongPassword = (password) => {
  return password.length >= 6;
};

// Validate URL
export const isValidURL = (url) => {
  if (!url) return true;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate future date
export const isFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(date) >= today;
};

// Validate event title
export const isValidTitle = (title) => {
  return title.trim().length >= 3;
};

// Validate description
export const isValidDescription = (description) => {
  return description.trim().length >= 10;
};

// Validate registration link
export const isValidRegistrationLink = (link) => {
  if (!link) return true;
  return isValidURL(link);
};

// Validate phone number
export const isValidPhone = (phone) => {
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone);
};

// Validate image URL
export const isImageURL = (url) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

// Validate event form
export const validateEvent = (event) => {
  if (isEmpty(event.title)) return "Event title is required.";
  if (!isValidTitle(event.title)) return "Event title is too short.";
  if (isEmpty(event.description)) return "Description is required.";
  if (!isFutureDate(event.date)) return "Event date must be today or later.";
  if (!isValidRegistrationLink(event.registration_link))
    return "Invalid registration URL.";

  return null;
};

// Validate registration form
export const validateRegister = (user) => {
  if (isEmpty(user.name)) return "Society name is required.";
  if (!isValidEmail(user.email)) return "Invalid email address.";
  if (!isStrongPassword(user.password))
    return "Password must be at least 6 characters.";
  if (!isValidDescription(user.description))
    return "Description must be at least 10 characters.";

  return null;
};