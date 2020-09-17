import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Theme,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { fetchData, resetPage, clearPhotos } from "../store/appSlice";

import { AppState, RoverCamera, RoverName } from "../Interfaces/AppInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(1),
    },
  })
);

const Form = () => {
  const classes = useStyles();
  const [rover, setRover] = useState<RoverName>("");
  const [camera, setCamera] = useState<RoverCamera>("");
  const [sol, setSol] = useState();
  const [errorSimulator, setErrorSimulator] = useState(false);
  const rovers = useSelector(
    (state: AppState) => state.appSlice.availableRovers
  );
  const currentPage = useSelector(
    (state: AppState) => state.appSlice.currentPage
  );

  const dispatch = useDispatch();

  // handlers ***********
  const handleSelectRover = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(resetPage());
    setRover(event.target.value as RoverName);
  };
  const handleSelectCamera = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(resetPage());
    setCamera((event.target.value as string) as RoverCamera);
  };
  const handleSelectSol = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(resetPage());
    setSol(event.target.value as string);
  };
  const handleSimulateError = () => {
    setErrorSimulator(!errorSimulator);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // prevent load same photos from page #1
    // clear fetchedPhotos in Store to prevent displaying photos from different days

    // simulating network error - wrong rover name
    const errorCause = errorSimulator ? " ERROR_CAUSE" : "";
    if (currentPage === 1 || errorSimulator) {
      dispatch(clearPhotos());
      dispatch(
        fetchData({
          rover,
          camera,
          sol,
          currentPage,
          intendedError: errorCause,
        })
      );
    }
  };
  // *********** handlers
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.wrapper}
      >
        <Grid item md={3} sm={3} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="rover">Select Rover</InputLabel>
            <Select labelId="rover" value={rover} onChange={handleSelectRover}>
              <MenuItem value="">
                <em>Rover</em>
              </MenuItem>
              {rovers.map((r) => {
                return (
                  <MenuItem value={r.name} key={r.name}>
                    {r.name[0].toUpperCase() + r.name.slice(1)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3} sm={3} xs={12}>
          <FormControl fullWidth disabled={!rover}>
            <InputLabel id="camera">Select Camera</InputLabel>
            <Select
              labelId="camera"
              value={camera}
              onChange={handleSelectCamera}
            >
              <MenuItem value="">
                <em>Camera</em>
              </MenuItem>
              {rovers
                .find((r) => r.name === rover)
                ?.cameras.map((cam) => {
                  return (
                    <MenuItem value={cam} key={cam}>
                      {cam}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3} sm={3} xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Sol"
              type="number"
              onChange={handleSelectSol}
              inputProps={{ min: 0, max: 5000 }}
            />
          </FormControl>
        </Grid>
        <Grid item container md={3} sm={12} xs={12} justify="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!(rover && camera && sol)}
          >
            Show Photos
          </Button>
        </Grid>
        <Grid item container xs={12} justify="center">
          <FormControlLabel
            control={
              <Switch
                checked={errorSimulator}
                onChange={handleSimulateError}
                name="simulator"
              />
            }
            label="Simulate Bad Request Error"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
