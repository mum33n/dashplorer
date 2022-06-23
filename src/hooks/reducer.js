export const initialData = {
  accounts: JSON.parse(localStorage.getItem("accounts")),
  dashboard: [],
};
export default function reducer(state, action) {
  switch (action.type) {
    case "setAccounts":
      return { ...state, accounts: action.accounts };
    case "setDashboard":
      return { ...state, dashboard: action.dashboard };
    default:
      return state;
  }
}
