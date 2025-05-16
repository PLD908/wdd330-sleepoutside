export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return [];
  }
}

export function setLocalStorage(key, data) {
  let items = getLocalStorage(key);
  if (!Array.isArray(items)) items = [];
  items.push(data);
  localStorage.setItem(key, JSON.stringify(items));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (!parentElement) {
    console.error("Parent element is null or undefined");
    return;
  }
  if (clear) parentElement.innerHTML = '';
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}