import { createContext, useReducer } from 'react';
import TotalTransactionHistory from '../logic/TotalTransactionHistory';

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'PARSE_FILE':

            if (action.payload == null) {
                return state;
            }
            let data = action.payload.data;

            return {
                ...state,
                transactions: data,
            }

        case 'ADD_TAG':

            if (!state.tags.includes(action.payload.tag)) {
                console.log("Adding tag");
                state.tags.push(action.payload.tag);
            } else {
                console.log("Tag exists");
            }

            return {
                ...state,
                tags: state.tags
            }

        case 'REMOVE_TAG':

            state.transactions.removeTag(action.payload.tag);
            state.tags = state.tags.filter((tag) => tag.id !== action.payload.tag.id);

            return {
                ...state,
                tags: state.tags
            }
        
        case 'UPDATE_TAG':
            return {
                ...state,
                tags: state.tags
            }
        
        case 'UPDATE_TRANSACTOR_TAG':
            console.log("UPDATE");
            return {
                ...state
            }


        case 'DELETE_TRANSACTOR':
            state.transactions.removeTransactor(action.payload);
            return {
                ...state,
                transactions: state.transactions
            }

        case 'DELETE_TRANSACTION':
            state.transactions.removeTransaction(action.payload);
            return {
                ...state,
                transactions: state.transactions
            }

        default:
            return state;
    }
}


const initialState = {
    budget: 2000,
    tags: [],
    transactions: new TotalTransactionHistory([], [])
};

export const BudgetContext = createContext();

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <BudgetContext.Provider
            value={{
                budget: state.budget,
                tags: state.tags,
                transactions: state.transactions,
                dispatch,
            }}>
            {children}
        </BudgetContext.Provider>
    );
}