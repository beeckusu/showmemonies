import { useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import Table from 'react-bootstrap/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const TransactorTags = ({ transactor, tags }) => {
    const { dispatch } = useContext(BudgetContext);

    const handleSelectTag = (tagID) => {

        let tag = tags.find((tag) => tag.id === tagID)

        transactor.tags = [tag];
        const tagDetails = {
            id: transactor.id,
            transactor: transactor
        };

        dispatch({
            type: 'UPDATE_TRANSACTOR_TAG',
            payload: tagDetails,
        });
    };

    return (
        <DropdownButton title={transactor.tags.length !== 0 ? transactor.tags[0].name : ""} onSelect={(tagID) => {handleSelectTag(tagID)}}>
            {tags.map(tag => (
                <Dropdown.Item eventKey={tag.id}>
                    {tag.name}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}


const Transactor = ({ transactor }) => {
    const { tags, dispatch } = useContext(BudgetContext);

    const handleDeleteTransactor = () => {
        dispatch({
            type: 'DELETE_TRANSACTOR',
            payload: transactor,
        });
    };

    return (
        <tr>
            <td>{transactor.name}</td>
            <td><TransactorTags transactor={transactor} tags={tags} /></td>
            <td><button onClick={handleDeleteTransactor}>Delete</button></td>
        </tr>
    );
}

const AdjustTransactors = () => {

    const { transactions } = useContext(BudgetContext);



    return (
        <div>
            {transactions.transactors === null || transactions.transactors.length === 0 ? (
                <div>
                    No data available.
                </div>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Tags</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.transactors.map((item, index) => (<Transactor key={index} transactor={item} />))}
                    </tbody>
                </Table>
            )}

        </div>
    );
};

export default AdjustTransactors;