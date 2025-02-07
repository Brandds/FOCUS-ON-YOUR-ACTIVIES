import { createStore } from "https://esm.sh/redux";

// Recupera o estado salvo no localStorage (se existir)
const savedState = JSON.parse(localStorage.getItem("reduxState")) || {
    usuarioAtivo: null
};

// Reducer (função que modifica o estado)
const userReducer = (state = savedState, action) => {
    switch (action.type) {
        case "SET_USUARIO":
            const newState = { ...state, usuarioAtivo: action.payload };
            localStorage.setItem("reduxState", JSON.stringify(newState)); // Salva no localStorage
            return newState;
        case "LOGOUT":
            localStorage.removeItem("reduxState"); // Remove ao fazer logout
            return { ...state, usuarioAtivo: null };
        default:
            return state;
    }
};

// Criando a store
const store = createStore(userReducer);

// Atualiza o localStorage sempre que o estado mudar
store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
