import React, { useState } from "react";
import "./App.css";
import {
  AppBar,
  Theme,
  Toolbar,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { testClick } from "./store/appSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { flexGrow: 1 },
    ToolBar: {
      justifyContent: "center",
      backgroundColor: theme.palette.error.dark,
    },
  })
);
const App: React.FC = () => {
  const dispatch = useDispatch();
  const [age, setAge] = useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.ToolBar}>
          <Typography variant="h6">Mars-o-Gram</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </Grid>
        <button
          onClick={() => {
            dispatch(testClick());
          }}
        >
          TEst
        </button>
      </Container>
    </div>
  );
};

export default App;
