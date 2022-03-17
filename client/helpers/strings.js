export default function capitalizeFirstLetterOnly(word) {
  if (!word || word.length === 0) return "";
  return word.charAt(0) + word.substring(1).toLowerCase();
}
