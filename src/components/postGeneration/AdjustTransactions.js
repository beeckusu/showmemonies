import { useContext } from 'react';
import { BudgetContext, ACTION_DELETE_TRANSACTION } from '../../context/BudgetContext';
import Table from 'react-bootstrap/Table';

const Transaction = ({ transaction }) => {

    const { dispatch } = useContext(BudgetContext);

    const handleDeleteTransaction = () => {
        dispatch({
            type: ACTION_DELETE_TRANSACTION,
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

    const defaultTransactors = {income: [], expenses: []}
    const {income = [], expenses = []} = transactions || defaultTransactors;

    return (
        <div>
            <h1>Income</h1>
            {
                income.length === 0 ? (<p>No data available.</p>) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {income.map((income, index) => (<Transaction key={index} transaction={income} />))}
                        </tbody>
                    </Table>
                )
            }
            <h1>Expenses</h1>
            {
                expenses.length === 0 ? (<p>No data available.</p>) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => (<Transaction key={index} transaction={expense} />))}
                        </tbody>
                    </Table>
                )
            }
        </div>
    );
}

export default AdjustTransactions;