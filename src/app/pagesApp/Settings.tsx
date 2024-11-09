'use client'
import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";


function Settings() {
  const [showRevenue, setShowRevenue] = useState(true)
  const [showProfit, setShowProfit] = useState(true)
  const [showOrders, setShowOrders] = useState(true)
  const [showCustomers, setShowCustomers] = useState(true)
  const handleShowRevenue = (event) => {
    setShowRevenue(event.target.checked)
  }
  const handleShowProfit = (event) => {
    setShowProfit(event.target.checked)
  }
  const handleShowOrders = (e) => {
    setShowOrders(e.target.checked)
  }

  const handleShowCustomers = (e) => {
    setShowCustomers(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <h1>Settings</h1>
      <Box>
        <Typography variant='h4' gutterBottom>
          Dashboard Features
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component='fieldset'>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch 
                      checked={showRevenue}
                      onChange={handleShowRevenue}
                      />
                  }
                    label='Revenue'
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showProfit}
                        onChange={handleShowProfit}
                      />
                  }
                    label='Profit'
                  />
                  <FormControlLabel
                    control={<Switch
                      checked={showOrders}
                      onChange={handleShowOrders}
                      />
                  }
                    label='orders'
                  />
                                    <FormControlLabel
                    control={<Switch
                      checked={showCustomers}
                      onChange={handleShowCustomers}
                      />
                  }
                    label='Customers'
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Settings
              </Button>
            </Grid>

          </Grid>
        </form>
      </Box>
    </>

  )
}

export default Settings