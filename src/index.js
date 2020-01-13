import React from 'react'
import ReactDOM from 'react-dom'

import { makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import calculator from './calculator'

import './index.css'

const useStyles = makeStyles(theme => ({
  form: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  error: {
    color: theme.palette.error.light
  }
}))

const App = () => {
  const classes = useStyles()

  const [resistorValues, setResistorValues] = React.useState('')
  const [inSeries, setInSeries] = React.useState(true)
  const [totalR, setTotalR] = React.useState(0)
  const [steps, setSteps] = React.useState([])
  const [error, setError] = React.useState(null)

  const onResistorValuesChange = e => {
    e.preventDefault()
    e.stopPropagation()
    let value = e.target.value
    value = value.replace(/[^0-9\s.,]/g, '')
    setResistorValues(value)
    setError(null)
  }

  const onSeriesCheckboxChange = e => {
    setInSeries(!inSeries)
    setSteps([])
    setError(null)
  }

  const onClearClick = e => {
    e.preventDefault()
    e.stopPropagation()
    setResistorValues('')
    setTotalR(0)
    setSteps([])
    setError(null)
  }

  const onCalculateClick = e => {
    e.preventDefault()
    e.stopPropagation()

    const values = resistorValues.split(/[\s,]/)
      .map(Number)
      .filter(Boolean)
    if (values.length < 2) {
      setError('At least 2 resistor values are required')
      return
    }
    const [total, $steps] = inSeries
      ? calculator.series(values)
      : calculator.parallel(values)
    setTotalR(total)
    setSteps($steps)
    setError(null)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>Resistor Calculator</Typography>
        <Typography variant='body1' component='p' gutterBottom>
          Use this calculator to calculate the total resistance value of a set of resistors in series or in parallel.
        </Typography>
        <Typography variant='body2' component='p' gutterBottom>
          Enter your resistor values (numbers only) separated by spaces or commas and click the calculate button to determine the total resistance.
        </Typography>
        <TextField
          id='resistor-values-textarea'
          label='Resistor Values'
          placeholder='R1 R2 R3 ...'
          rows={5}
          multiline
          onChange={onResistorValuesChange}
          value={resistorValues}
          variant='filled'
          fullWidth
          autoFocus
        />
        {
          error
            ? (
              <div>
                <Typography className={classes.error} variant='body1' gutterBottom>
                  {error}
                </Typography>
              </div>
            ) : null
        }
        <form className={classes.form} noValidate autoComplete='off'>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inSeries}
                  onChange={onSeriesCheckboxChange}
                  color='primary'
                />
              }
              label='Calculate total(R) in series'
            />
          </FormGroup>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              color='secondary'
              className={classes.button}
              onClick={onClearClick}
              disabled={!resistorValues.length}
              fullWidth
            >
              Clear
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={onCalculateClick}
              disabled={!resistorValues.length}
              fullWidth
            >
              Calculate
            </Button>
          </div>
        </form>
        <Typography variant='h6' component='h2' gutterBottom>
          Calculated Total Resistance:
        </Typography>
        <Paper className={classes.paper} elevation={3}>
          <Typography variant='h6' component='p' gutterBottom>
            Total(R) = {totalR}Ω (Ohm)
          </Typography>
        </Paper>
        <Typography variant='h6' component='h2' gutterBottom>
          Calculation Explained:
        </Typography>
        <Paper className={classes.paper} elevation={3}>
          {!steps.length ? (
            <Typography variant='h6' component='p' gutterBottom>
              No resistor values to examine...
            </Typography>
          ) : null}
          {steps.map(step => {
            return (
              <Typography key={step} variant='h6' component='p' gutterBottom>
                {step}
              </Typography>
            )
          })}
        </Paper>
        <Typography variant='subtitle2' gutterBottom>
          &copy; 2020, Richard Marks
        </Typography>
      </Container>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
