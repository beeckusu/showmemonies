import { useContext } from 'react';
import { BudgetContext, ACTION_DELETE_TRANSACTOR, ACTION_UPDATE_TRANSACTOR_TAG } from '../../context/BudgetContext';
import Table from 'react-bootstrap/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const TagsDropdown = ({ transactor, tags }) => {
    const { dispatch } = useContext(BudgetContext);

    const handleSelectTag = (tagID) => {

        let tag = tags.find((tag) => tag.id === tagID)

        transactor.tags = [tag];
        const tagDetails = {
            id: transactor.id,
            transactor: transactor
        };

        dispatch({
            type: ACTION_UPDATE_TRANSACTOR_TAG,
            payload: tagDetails,
        });
    };

    return (
        <DropdownButton title={transactor.tags.length !== 0 ? transactor.tags[0].name : ""} onSelect={(tagID) => { handleSelectTag(tagID) }}>
            {tags.map(tag => (
                <Dropdown.Item key={tag.id} eventKey={tag.id}>
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
            type: ACTION_DELETE_TRANSACTOR,
            payload: transactor,
        });
    };

    return (
        <tr>
            <td>{transactor.name}</td>
            <td><TagsDropdown transactor={transactor} tags={tags} /></td>
            <td><button onClick={handleDeleteTransactor}>Delete</button></td>
        </tr>
    );
}

const TransactorsTable = () => {

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

export default TransactorsTable;