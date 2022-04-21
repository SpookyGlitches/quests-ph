import axios from "axios";

export default async function addUserToConvo(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const addedUser = await axios.put(
      `https://api.talkjs.com/v1/tvcbUw3n/conversations/8c60c6177eedd03532cf/participants/cl24k8a1k0056zkta0e2p7ob2`,
      {
        data: {
          access: "ReadWrite",
          notify: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer sk_test_NPBhbi9sSMV8aA6DnWhSkmKzxQpivO6p`,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(addedUser);
    return res.status(201).json(addedUser);
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
}
