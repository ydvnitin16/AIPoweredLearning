import { useState } from "react";

export function useCreateTopic() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

 const createTopic = async (formData) => {
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-topic`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json(); // will fail if backend responds with non-JSON
    console.log(data)
    if (!res.ok) throw new Error(data.message || "Failed to create topic");

    setSuccess(true);
    return data;
  } catch (err) {
    setError(err.message);
    console.error("❌ Error creating topic:", err);
    return null;
  } finally {
    setLoading(false);
  }
};


  return { createTopic, loading, error, success };
}
