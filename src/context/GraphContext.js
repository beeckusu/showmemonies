import { createContext, useReducer } from 'react';

const GraphReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_DATE_RANGE':

            return {
                ...state
            }
        
        case 'CHANGE_DATE_INTERVAL':
            let newInterval = action.payload.interval;

            return {
                ...state,
                interval: newInterval
            }

        default:
            return state;
    }
}


const initialState = {
    interval: "Month",
    dateRange: []
};

export const GraphContext = createContext();

export const GraphProvider = ({children}) => {
    const [state, dispatch] = useReducer(GraphReducer, initialState);

    return (
        <GraphContext.Provider
            value={{
                interval: state.interval,
                dateRange: state.dateRange,
                dispatch,
            }}>
            {children}
        </GraphContext.Provider>
    );
}