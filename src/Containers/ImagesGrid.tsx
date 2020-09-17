import React from "react";
import {
  Grid,
  GridList,
  GridListTile,
  Snackbar,
  SnackbarContent,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import { AppState } from "../Interfaces/AppInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: theme.spacing(5),
    },
  })
);
const ImagesGrid = () => {
  const classes = useStyles();
  const theme = useTheme();
  const photos = useSelector((state: AppState) => state.appSlice.fetchedPhotos);
  const currentPage = useSelector(
    (state: AppState) => state.appSlice.currentPage
  );
  const errorMessage = useSelector(
    (state: AppState) => state.appSlice.errorMessage
  );
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));

  const viewportSizeToCols = () => {
    if (mdAndUp) {
      return 3;
    }
    if (smAndUp) {
      return 2;
    }
    return 1;
  };

  return (
    <Grid container className={classes.wrapper}>
      {/* first made this with ternary but it is hard to read when you have two  nested of them */}
      {/*
      on data load
      */}
      {photos.length !== 0 && (
        <GridList cellHeight={240} cols={viewportSizeToCols()}>
          {photos.map((photo) => (
            // @ts-ignore
            <GridListTile key={photo.id}>
              {/* //it seems it will take too long to add type for whole API response */}
              {/* object
              /anyway it is not crucial for app work */}
              // @ts-ignore
              <img src={photo.img_src} alt={photo.img_src} />
            </GridListTile>
          ))}
        </GridList>
      )}

      <Grid container item justify="center">
        {errorMessage && <SnackbarContent message={errorMessage} />}

        {/*
          on first load
        */}
        {photos.length === 0 && !errorMessage && currentPage === 1 && (
          <p>
            <Typography variant="overline">
              Please Select Rover, Camera and Sol In a Form Above
            </Typography>
          </p>
        )}
        {/*
        if there is no data for selected values
        */}
        {photos.length === 0 && !errorMessage && currentPage !== 1 && (
          <p>
            <Typography variant="overline">
              Opps! It Looks Like all photos for this Rover/Camera/Sol
              combination were deleted by Aliens!
            </Typography>
            <Typography variant="caption" display="block">
              ...Or maybe they have never existed. Please try another parameters
              in a form above!
            </Typography>
          </p>
        )}
      </Grid>
    </Grid>
  );
};

export default ImagesGrid;
