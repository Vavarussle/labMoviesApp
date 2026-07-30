import React from "react";
import Grid from "@mui/material/Grid";
import Header from "../headerActorList";
import ActorList from "../actorList";
import { ActorListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const ActorListPageTemplate: React.FC<ActorListPageTemplateProps> = ({
  actors,
  title,
  action,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

      <Grid item container spacing={5}>
        <ActorList
          actors={actors}
          action={action}
        />
      </Grid>
    </Grid>
  );
};

export default ActorListPageTemplate;