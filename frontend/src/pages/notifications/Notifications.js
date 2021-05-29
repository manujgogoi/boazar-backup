import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MainLayout from "../../containers/MainLayout";
import MenuItems from "../../components/MenuItems";

function Notifications(props) {
  // Pass props to MenuItems before return
  const menuItems = MenuItems(props);
  return (
    <MainLayout drawerMenuItems={menuItems}>
      <Container>
        <Typography>Notifications (Private Route)</Typography>
      </Container>
    </MainLayout>
  );
}

export default Notifications;
