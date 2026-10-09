// lib/utils.js

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর
export function toBengaliNumber(num) {
  if (num === null || num === undefined) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[digit]);
}

// আজকের বাংলা তারিখ তৈরি করা
export function getBengaliDate(date) {
  if (!date) return '';
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('bn-BD', options);
}

// API Endpoints
export const API_BASE_URL = 'https://api.api-store.workers.dev/api/bazardor';
export const API_FALLBACK_URL = 'https://api.abcz.workers.dev/api/bazardor';