import React from "react";
import { Button, Grid, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/appSlice";
import { AppState, FetchDataParams } from "../Interfaces/AppInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(5),
    },
  })
);
const Paginator = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentRequest = useSelector(
    (state: AppState) => state.appSlice.currentRequest
  );
  const currentPage = useSelector(
    (state: AppState) => state.appSlice.currentPage
  );
  const hasMoreToLoad = useSelector(
    (state: AppState) => state.appSlice.hasMoreToLoad
  );
  const handleLoadMore = () => {
    const fetchDataParams: FetchDataParams = {
      rover: currentRequest.rover,
      camera: currentRequest.camera,
      sol: currentRequest.sol,
      currentPage,
    };
    dispatch(fetchData(fetchDataParams));
  };
  return (
    <Grid container className={classes.wrapper} justify="center">
      {/*
        // api sends 25 photos per page.
        //  currentRequest takes data from last payload
        //  as api does not provide info for total amout of photo
        //  this is the only working solution for edge cases where
        //  total amout of photos is 25/50/75 etc.
        */}
      {hasMoreToLoad && (
        <Button variant="contained" color="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </Grid>
  );
};

export default Paginator;
