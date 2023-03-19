import { BudgetContext, ACTION_ADD_TAG, ACTION_UPDATE_TAG, ACTION_REMOVE_TAG } from "../../context/BudgetContext";
import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { v4 as uuidv4 } from 'uuid';

class Tag {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

const TagRow = ({tag}) => {

    const { dispatch } = useContext(BudgetContext);

    const handleRemoveTag = (event) => {
        event.preventDefault();
        const tagDetails = {
            id: uuidv4(),
            tag: tag,
        }

        dispatch({
            type: ACTION_REMOVE_TAG,
            payload: tagDetails,
        });
    }

    const handleChangeName = (event) => {
        tag.name = event.target.value;
        event.preventDefault();
        const tagDetails = {
            id: uuidv4(),
            tag: tag,
        }

        dispatch({
            type: ACTION_UPDATE_TAG,
            payload: tagDetails,
        });
    }
    const handleChangeColor = (event) => {
        tag.color = event.target.value;
        event.preventDefault();
        const tagDetails = {
            id: uuidv4(),
            tag: tag,
        }

        dispatch({
            type: ACTION_UPDATE_TAG,
            payload: tagDetails,
        });
    }


    return (
        <tr>
            <td><input
                type="text"
                value={tag.name}
                onChange={handleChangeName} />
            </td>
            <td>
                <input
                    type="color"
                    value={tag.color}
                    onChange={handleChangeColor}
                    placeholder="Tag color" />
            </td>
            <td>
                <button onClick={handleRemoveTag}>Remove</button>
            </td>
        </tr>
    );
};

const AdjustTags = () => {
    const { tags, dispatch } = useContext(BudgetContext);

    const createNewTag = (event) => {
        event.preventDefault();
        let id = uuidv4();
        const newTag = new Tag(id, "", '#000000');
        const tagDetails = {
            id: uuidv4(),
            tag: newTag,
        }

        dispatch({
            type: ACTION_ADD_TAG,
            payload: tagDetails,
        });
        console.log(tags);
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((item, index) => (<TagRow key={index} tag={item} />))}
                    <tr>
                        <td>
                        </td>
                        <td>
                            <button onClick={createNewTag}>Add</button>
                        </td>

                    </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default AdjustTags;