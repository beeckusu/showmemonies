import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import FileGenerator from '../../logic/data_generators/FileGenerator';
import React, { useContext, useState } from 'react';

import { BudgetContext,  ACTION_PARSE_FILE } from '../../context/BudgetContext';

const FileUploadForm = () => {

  const { dispatch } = useContext(BudgetContext);

  const [file, setFile] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    const generator = new FileGenerator();
    if (!generator.canParse(file)) {
        return;
    }

    generator.parseData(file).then(result => {

        const fileDetails = {
          id: uuidv4(),
          data: result
        }
    
        dispatch({
          type: ACTION_PARSE_FILE,
          payload: fileDetails,
        });
    
    });


  };
  return (
    <div>

      <form onSubmit={onSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Expenses Upload</Form.Label>
          <Form.Control type="file" onChange={(event) => {
            setFile(event.target.files[0])
          }} />
          <Button type="submit" >Continue</Button>
        </Form.Group>
      </form>

        

    </div>
  );
}

export default FileUploadForm;