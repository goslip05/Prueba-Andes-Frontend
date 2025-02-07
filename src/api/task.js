const urlback = "http://prueba-andes-backend.test";

export const getListTaskApi = (title,estadoInterno) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const url = /* import.meta.env.VITE_API_URL */ urlback + `/api/get-tasks`;
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, status: estadoInterno }),
    withCredentials: true,
  };

  return fetch(url, params)
    .then((res) => res.json())
    .catch((err) => err);
};
export const getTaskApi = (id) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const url = /* import.meta.env.VITE_API_URL */ urlback + `/api/task/${id}`;
  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return fetch(url, params)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const postCreateTaskApi = (data) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const url = /* import.meta.env.VITE_API_UR */ urlback + `/api/tasks`;
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    withCredentials: true,
  };

  return fetch(url, params)
    .then(async (response) => {
      const data = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        data: data,
      };
    })
    .catch((err) => ({
      ok: false,
      status: 500,
      data: err,
    }));
};

export const postUpdateTaskApi = (data, id) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const url = /* import.meta.env.VITE_API_URL */ urlback + `/api/tasks/${id}`;
  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    withCredentials: true,
  };

  return fetch(url, params)
    .then(async (response) => {
      const data = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        data: data,
      };
    })
    .catch((err) => ({
      ok: false,
      status: 500,
      data: err,
    }));
};

export const postDeleteTaskApi = (id) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const url = /* import.meta.env.VITE_API_URL */ urlback + `/api/tasks/${id}`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return fetch(url, params)
    .then(async (response) => {
      const data = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        data: data,
      };
    })
    .catch((err) => ({
      ok: false,
      status: 500,
      data: err,
    }));
};
