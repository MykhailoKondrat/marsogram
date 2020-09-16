import React from "react"
import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core"
import SwapHorizIcon from "@material-ui/icons/SwapHoriz"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    currencyCalculator: {
      marginTop: theme.spacing(4),
      backgroundColor: theme.palette.grey["50"],
      padding: theme.spacing(0.5),
      minHeight: theme.spacing(8),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignContent: "center",
      },
    },
    currencyInputForm: {
      justifyContent: "space-between",
    },
  })
)
const CurrencyCalculator = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.currencyCalculator} alignItems="center">
      <Grid
        container
        item
        justify="space-between"
        xs={8}
        sm={5}
        className={classes.currencyInputForm}
      >
        <Grid item xs={7} sm={8}>
          <TextField
            size="small"
            type="number"
            variant="outlined"
            label="Change"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <FormControl>
            <Select id="change" value="UAH">
              <MenuItem value="UAH">UAH</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container item justify="center" xs={12} sm={2}>
        <IconButton color="primary" aria-label="add to shopping cart">
          <SwapHorizIcon />
        </IconButton>
      </Grid>

      <Grid container item xs={8} sm={5} className={classes.currencyInputForm}>
        <Grid item xs={7} sm={8}>
          <TextField
            size="small"
            type="number"
            variant="outlined"
            label="Get"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <FormControl>
            <Select id="change" value="UAH">
              <MenuItem value="UAH">UAH</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CurrencyCalculator
