import React from 'react'
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

function Dashboard() {
    return (<div>
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
        <h1>Dashboard</h1>
    </div>
    )
}

export default Dashboard