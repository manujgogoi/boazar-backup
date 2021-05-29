import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

// Not a vendor
const NotAVendor = () => {
  return (
    <div>
      You are not a vendor.
      <RouterLink
        to="/become_vendor"
        style={{ textDecoration: "none", marginLeft: 10 }}
      >
        <Button variant="outlined" color="primary">
          Click here to register vendor.
        </Button>
      </RouterLink>
    </div>
  );
};

export default NotAVendor;
