export default function getCategoryColor(category) {
  switch (category) {
    case "HEALTH":
      return "#DB3A34";
    case "CAREER":
      return "#346ED9";
    case "SOCIAL":
      return "#FAA916";
    default:
      return "white";
  }
}
