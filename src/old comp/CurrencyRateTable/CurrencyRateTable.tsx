import React from "react"
import { Grid, Theme, Typography } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import TableRow from "../TableRow/TableRow"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableHead: {
      padding: theme.spacing(1),
      overflow: "scroll",
      backgroundColor: theme.palette.grey["100"],
      alignItems: "center",
    },
    currencyRateTable: {
      marginTop: theme.spacing(3),
    },
    tableLabel: {
      paddingLeft: theme.spacing(1),
    },
  })
)

const CurrencyRateTable = () => {
  const testData = [
    { ccy: "USD", baseCcy: "UAH", buy: 27.45, sale: 27.86 },
    { ccy: "EUR", baseCcy: "UAH", buy: 32.4, sale: 33.01 },
    { ccy: "RUR", baseCcy: "UAH", buy: 0.355, sale: 0.382 },
    { ccy: "BTC", baseCcy: "USD", buy: 9944.8276, sale: 10991.6516 },
  ]
  const classes = useStyles()
  return (
    <Grid
      container
      component="header"
      alignItems="center"
      alignContent="stretch"
      className={classes.currencyRateTable}
    >
      <Grid className={classes.tableHead} container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Currency For Current Date</Typography>
        </Grid>
        <Grid item xs={4} className={classes.tableLabel}>
          <Typography variant="subtitle2">Buy</Typography>
        </Grid>
        <Grid item xs={4} className={classes.tableLabel}>
          <Typography variant="subtitle2">Sell</Typography>
        </Grid>
      </Grid>

      {testData.map((pairOfExchangeValues, id) => {
        return <TableRow key={id} data={pairOfExchangeValues} />
      })}
    </Grid>
  )
}

export default CurrencyRateTable
