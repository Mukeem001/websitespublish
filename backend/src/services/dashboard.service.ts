const API_URL =
  "http://localhost:5000/api";

export const getDashboard =
  async () => {
    const token =
      localStorage.getItem(
        "super_admin_token"
      );

    const response =
      await fetch(
        `${API_URL}/super-admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message
      );
    }

    return data.data;
  };