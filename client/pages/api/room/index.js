export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      console.log(req.method);
      return res.status(200).send();
    }
  } catch (e) {
    return res.status(500).send();
  }
}
