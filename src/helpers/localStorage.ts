import Cookies from 'js-cookie'

export function getItem(key: string) {
  const value = Cookies.get(key);
  return value ? value : null;
}

export function getItemJson(key: string) {
  const value = Cookies.get(key);
  return value ? JSON.parse(value) : null;
}
export function setItemJson(key: string, value: string) {
  Cookies.set(key, JSON.stringify(value), { expires: 365 });
}

export function setItem(key: string, value: string) {
  Cookies.set(key, value, { expires: 365 });
}

export function removeItem(key: string) {
  Cookies.remove(key);
}
