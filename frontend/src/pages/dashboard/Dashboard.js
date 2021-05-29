import React from "react";
import Container from "@material-ui/core/Container";
import MainLayout from "../../containers/MainLayout";
import MenuItems from "../../components/MenuItems";
import HeaderMenu from "../../components/HeaderMenu";
import { connect } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import * as vendorActions from "../../store/actions/vendorActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotAVendor from "../../components/NotAVendor";
import InactiveVendor from "../../components/InactiveVendor";

// Active Dashboard
const ActiveDashboard = () => {
  return <div>Active user dashboard </div>;
};

// VendorDashboard
const VendorDashboard = ({ vendor }) => {
  if (vendor !== null) {
    if (vendor.is_active) {
      return <ActiveDashboard />;
    }
    return <InactiveVendor vendor={vendor} />;
  }
  return <NotAVendor />;
};

function Dashboard(props) {
  React.useEffect(() => {
    props.updateUser();
    props.updateVendor();
  }, []);

  // Pass props to MenuItems before return
  const menuItems = MenuItems(props);

  return (
    <MainLayout drawerMenuItems={menuItems} headerMenu={<HeaderMenu />}>
      {props.userLoading ? (
        <Container>
          User Loading... <CircularProgress />
        </Container>
      ) : (
        <Container>
          <VendorDashboard vendor={props.vendor} />
        </Container>
      )}
    </MainLayout>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    user: state.UserReducer.user,
    userLoading: state.UserReducer.isLoading,
    vendor: state.VendorReducer.vendor,
    vendorLoading: state.VendorReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: () => dispatch(userActions.updateUserState()),
    updateVendor: () => dispatch(vendorActions.updateVendorState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
