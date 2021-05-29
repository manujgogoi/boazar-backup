import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Home(props) {
  return (
    <Container>
      <Typography>Home (Public Route)</Typography>
      <Link href="/login" variant="body2">
        Login
      </Link>
    </Container>
  );
}

export default Home;
