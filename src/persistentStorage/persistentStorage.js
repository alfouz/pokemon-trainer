const key = "pokemon-trainer-key";

export const saveData = (todos) => {
  localStorage.setItem(key, JSON.stringify(todos));
};
export const loadData = () => {
  return JSON.parse(localStorage.getItem(key));
};

const functions = { saveData, loadData };

export default functions;
