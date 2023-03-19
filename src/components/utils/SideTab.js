import '../../css/modules.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const SideTab = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <div style ={{position: 'fixed', right: 0, top: 0, zIndex: 1}}>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open} className='circular-button'
            >
                +
            </Button>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', position: 'relative', top:'70px'}}>
                <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        {props.content}
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

export default SideTab;