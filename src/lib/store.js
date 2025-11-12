export async function getVentures() {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('ventures') || '[]');
  }
  return [];
}

export async function saveVenture(venture) {
  if (typeof window !== 'undefined') {
    const ventures = JSON.parse(localStorage.getItem('ventures') || '[]');
    ventures.push(venture);
    localStorage.setItem('ventures', JSON.stringify(ventures));
  }
}

export async function updateVenture(id, updates) {
  if (typeof window !== 'undefined') {
    const ventures = JSON.parse(localStorage.getItem('ventures') || '[]');
    const idx = ventures.findIndex(v => v.id === id);
    if (idx !== -1) {
      ventures[idx] = { ...ventures[idx], ...updates };
      localStorage.setItem('ventures', JSON.stringify(ventures));
    }
  }
}