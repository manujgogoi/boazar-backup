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

import ProductsTable from "./ProductsTable";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  pageHeading: {
    width: "100%",
    height: 50,
    backgroundColor: "grey",
  },
}));

// Product Home
const ProductHome = (props) => {
  const classes = useStyle();
  return (
    <div>
      <div className={classes.pageHeading}>Page Heading</div>
      <ProductsTable />
    </div>
  );
};

// Product Component
const ProductComponent = (props) => {
  if (props.vendor !== null) {
    if (props.vendor.is_active) {
      return <ProductHome {...props} />;
    }
    return <InactiveVendor vendor={props.vendor} />;
  }
  return <NotAVendor />;
};

function Products(props) {
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
          Loading... <CircularProgress />
        </Container>
      ) : (
        <ProductComponent {...props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Products);
