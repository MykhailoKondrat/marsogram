import React from "react"
import { Grid } from "@material-ui/core"
import TableCell from "../TableCell/TableCell"

interface exchangeRatePair {
  data: {
    ccy: string
    baseCcy: string
    buy: string | number
    sale: string | number
  }
}
const TableRow = ({ data }: exchangeRatePair) => {
  const rowLabel = `${data.ccy}/ ${data.baseCcy}`
  return (
    <Grid container wrap="nowrap" alignItems="center" alignContent="stretch">
      <TableCell key="label" type="readOnly" value={rowLabel} />
      <TableCell key="buy" type="editable" value={data.buy} />
      <TableCell key="sale" type="editable" value={data.sale} />
    </Grid>
  )
}

export default TableRow
