import { createContext, useReducer } from 'react';
import TotalTransactionHistory from '../logic/TotalTransactionHistory';

export const ACTION_PARSE_FILE = 'PARSE_FILE'
export const ACTION_ADD_TAG = 'ADD_TAG'
export const ACTION_REMOVE_TAG = 'REMOVE_TAG'
export const ACTION_UPDATE_TAG = 'UPDATE_TAG'
export const ACTION_UPDATE_TRANSACTOR_TAG = 'UPDATE_TRANSACTOR_TAG'
export const ACTION_DELETE_TRANSACTOR = 'DELETE_TRANSACTOR'
export const ACTION_DELETE_TRANSACTION = 'DELETE_TRANSACTION'


const AppReducer = (state, action) => {
    switch (action.type) {
        case ACTION_PARSE_FILE:

            if (action.payload == null) {
                return state;
            }
            let data = action.payload.data;

            return {
                ...state,
                transactions: data,
            }

        case ACTION_ADD_TAG:

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

        case ACTION_REMOVE_TAG:

            state.transactions.removeTag(action.payload.tag);
            state.tags = state.tags.filter((tag) => tag.id !== action.payload.tag.id);

            return {
                ...state,
                tags: state.tags
            }
        
        case ACTION_UPDATE_TAG:
            return {
                ...state,
                tags: state.tags
            }
        
        case ACTION_UPDATE_TRANSACTOR_TAG:
            console.log("UPDATE");
            return {
                ...state
            }


        case ACTION_DELETE_TRANSACTOR:
            state.transactions.removeTransactor(action.payload);
            return {
                ...state,
                transactions: state.transactions
            }

        case ACTION_DELETE_TRANSACTION:
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