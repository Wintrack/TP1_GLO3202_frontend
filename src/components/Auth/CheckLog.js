const checkLog = async (token) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/users/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return !!response.ok;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default checkLog;
