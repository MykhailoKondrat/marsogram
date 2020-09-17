import React from "react";
import "./App.css";
import {
  AppBar,
  Theme,
  Toolbar,
  Typography,
  Container,
  Grid,
  LinearProgress,
  Fab,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import Form from "./Containers/Form";
import ImagesGrid from "./Containers/ImagesGrid";
import Paginator from "./Containers/Paginator";
import { AppState } from "./Interfaces/AppInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginTop: theme.spacing(8) },
    ToolBar: {
      justifyContent: "center",
      backgroundColor: theme.palette.error.dark,
      zIndex: 200,
    },
    formWrap: {
      marginTop: theme.spacing(12),
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1000,
    },
  })
);

const App = () => {
  const classes = useStyles();
  const loading = useSelector((state: AppState) => state.appSlice.loading);
  const photos = useSelector((state: AppState) => state.appSlice.fetchedPhotos);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.ToolBar}>
          <Typography variant="h6">Mars-o-Gram</Typography>
        </Toolbar>
        {loading && <LinearProgress />}
      </AppBar>
      {photos.length > 8 && (
        <Fab
          color="primary"
          className={classes.fab}
          onClick={handleScrollToTop}
          size="small"
        >
          <VerticalAlignTopIcon style={{ color: "white" }} fontSize="small" />
        </Fab>
      )}

      <Container maxWidth="lg" className={classes.root}>
        <Grid container direction="column" justify="center">
          <Form />
          <ImagesGrid />
          <Paginator />
        </Grid>
      </Container>
    </div>
  );
};

export default App;
