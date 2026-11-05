// Cliente HTTP: único lugar donde el frontend conoce la URL del backend
const BASE = 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
    throw new Error(msg || `Error ${res.status}`);
  }
  return data;
}

const crud = (recurso) => ({
  listar: () => request(`/${recurso}`),
  crear: (body) => request(`/${recurso}`, { method: 'POST', body: JSON.stringify(body) }),
  actualizar: (id, body) => request(`/${recurso}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  eliminar: (id) => request(`/${recurso}/${id}`, { method: 'DELETE' }),
});

export const recintosApi = crud('recintos');
export const eventosApi = crud('eventos-culturales');
