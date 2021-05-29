import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  makeStyles,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Cookies from "js-cookie";
import * as server from "../../utils/serverInfo";
import SpecificationForm from "./SpecificationForm";
import ImageUploadForm from "./ImageUploadForm";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductAddForm = (props) => {
  const classes = useStyles();
  const { open, setOpen, children, ...rest } = props;
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [values, setValues] = useState({
    type: "",
    category: "",
    title: "",
    isFeatured: false,
    regularPrice: "",
    discountPrice: "",
    wholesalePrice: "",
    quantity: "",
  });

  useEffect(() => {
    let cancel;
    axios
      .get(`${server.SERVER_URL}/api/store/products/types/`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => setTypes(res.data))
      .catch((err) => {
        console.log("Product Types error: ", err);
        if (axios.isCancel(err)) return;
      });
    return () => cancel();
  }, []);

  useEffect(() => {
    let cancel;
    axios
      .get(`${server.SERVER_URL}/api/store/categories/`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log("Categories Error : ", err);
        if (axios.isCancel(err)) return;
      });
    return () => cancel();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const toggleIsFeatured = (event) => {
    setValues({ ...values, isFeatured: !values.isFeatured });
  };

  const handleAddSpecifications = (event) => {
    console.log(event);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      {...rest}
    >
      <Paper variant="outlined" className={classes.root}>
        <Typography variant="h5" component="h2">
          Add Product
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                className={classes.formControl}
                required
                label="Product Title"
                name="title"
                variant="outlined"
                value={values.title}
                onChange={handleChange}
                size="small"
              />
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="select-product-type-label">
                  Product Type
                </InputLabel>
                <Select
                  labelId="select-product-type-label"
                  label="Product Type"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {types.map((type) => {
                    return (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="select-category-label">Category</InputLabel>
                <Select
                  labelId="select-category-label"
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((type) => {
                    return (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  multiline
                  rows={10}
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isFeatured}
                      name="isFeatured"
                      onChange={toggleIsFeatured}
                      color="primary"
                    />
                  }
                  label="Is Featured"
                  labelPlacement="end"
                />
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                className={classes.formControl}
                required
                label="Regular Price"
                name="regularPrice"
                value={values.regularPrice}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">&#8377;</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                className={classes.formControl}
                label="Discount Price"
                name="discountPrice"
                value={values.discountPrice}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">&#8377;</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                className={classes.formControl}
                label="Wholesale Price"
                name="wholesalePrice"
                value={values.wholesalePrice}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">&#8377;</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                className={classes.formControl}
                label="Quantity (Stock)"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.title}
                >
                  Specifications
                </Typography>
                <SpecificationForm productType={values.type} />
              </div>
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.title}
                >
                  Upload Images
                </Typography>
                <ImageUploadForm />
              </div>
            </Grid>
          </Grid>
        </form>
        <button onClick={handleClose}>Close</button>
      </Paper>
    </Dialog>
  );
};

export default ProductAddForm;
