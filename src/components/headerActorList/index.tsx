import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const styles = {
  header: {
    padding: "20px",
  },
};

interface HeaderProps {
  title: string;
}

const HeaderActorList: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Grid container sx={styles.header}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeaderActorList;