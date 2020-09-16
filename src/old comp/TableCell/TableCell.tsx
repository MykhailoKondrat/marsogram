import React, {useState} from 'react';
import {Grid, IconButton, TextField, Theme, Typography} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
//TODO :Specify TYPE for VALUE
interface TableCell {
  type: 'readOnly' | 'editable';
  value: number | string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell:{
      padding: theme.spacing(1),
      overflow:'scroll',
      fontSize: theme.typography.body2.fontSize,
      '&:hover':{
        backgroundColor:theme.palette.grey['50'],
        cursor:"pointer"
      }
    },
  }));

const TableCell = ({type, value}: TableCell) => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [hover,setHover] = useState(false);

  const handleClick = () => {
    setEditMode(!editMode);
    setHover(false)
  }
  const handleChange = (event: any ) => {
    setInputValue(event.target.value);
  }
  const handleBlur = () => {
    setEditMode(!editMode);
  }
  const handleHover =() => {
    setHover(!hover)
  }
  const minValue = type === 'editable' && typeof value === 'number'? parseFloat((value - (value/10)).toFixed(4)) : undefined;
  const maxValue = type === 'editable' && typeof value === 'number' ? parseFloat((value + (value/10)).toFixed(4)) : undefined;

  const readOnlyLabel = <Grid item xs={4} className={classes.tableCell}>{value}</Grid>;

  const editValueInput = <><TextField size="small"
                                      onChange={handleChange}
                                      value={inputValue}
                                      type="number"
                                      autoFocus/></>
  const editableLabel = editMode ?
    <Grid item
          xs={4}
          container
          wrap="nowrap"
          justify='center'
          className={classes.tableCell}
          onBlur={handleBlur}>
      {editValueInput}
      <IconButton
        color="primary"
        component="span"
        size="small" >
        <DoneIcon
          color="primary"
          fontSize="small"/>
      </IconButton>
      <IconButton
        color="primary"
        component="span"
        size="small">
        <ClearIcon
          color="error"
          fontSize="small"/>
      </IconButton>
    </Grid>:
    <Grid item
          container
          xs={4}
          alignItems='center'
          className={classes.tableCell}
          onClick={handleClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          justify='space-between'>
      <Typography variant="body1">
        {inputValue}
      </Typography>
      {hover && <EditIcon color="primary"/>}
    </Grid>

  return (
    <>
    { type === 'readOnly' && readOnlyLabel}
    {/*//rendering editable cell*/}
    { type === 'editable' && editableLabel}
    </>
  );
};

export default TableCell;