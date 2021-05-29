import Typography from "@material-ui/core/Typography";

// Inactive Vendor
const InactiveVendor = ({ vendor }) => {
  return (
    <div>
      <Typography display="inline" variant="body1" component="p">
        Your vendor
      </Typography>{" "}
      <Typography display="inline" color="secondary" variant="h5" component="p">
        {vendor.name}
      </Typography>{" "}
      <Typography display="inline" variant="body1" component="p">
        is inactive. Wait for verification or contact admin.
      </Typography>
    </div>
  );
};

export default InactiveVendor;
