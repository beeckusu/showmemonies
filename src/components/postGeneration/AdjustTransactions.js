import { useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import Table from 'react-bootstrap/Table';

const Transaction = ({ transaction }) => {
    
    const { dispatch } = useContext(BudgetContext);

    const handleDeleteTransaction = () => {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: transaction,
        });
    };

    return (
        <tr>
            <td>{transaction.transactor.name}</td>
            <td>{transaction.date.toLocaleString('default', { month: 'short', day: "numeric", year: "numeric" })}</td>
            <td className="text-right">{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'CAD' })}</td>
            <td><button onClick={handleDeleteTransaction}>Delete</button></td>
        </tr>
    );
}

const AdjustTransactions = () => {
    const { transactions } = useContext(BudgetContext);

    if (transactions.transactors === null || transactions.transactors.length === 0) {
        return (
            <div>
                No data available.
            </div>
        );
    }

    return (
        <div>
            <h1>Income</h1>
            {
                transactions.income.length === 0 ? (<p>No data available.</p>) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.income.map((item, index) => (<Transaction key={index} transaction={item} />))}
                        </tbody>
                    </Table>
                )
            }
            <h1>Expenses</h1>
            {
                transactions.expenses.length === 0 ? (<p>No data available.</p>) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.expenses.map((item, index) => (<Transaction key={index} transaction={item} />))}
                        </tbody>
                    </Table>
                )
            }
        </div>
    );
}

export default AdjustTransactions;