import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ImageUploadForm = (props) => {
  const classes = useStyles();
  const [imageFields, setImageFields] = useState([
    { image: "", altText: "", isFeature: false },
  ]);

  const handleAddImageField = () => {
    const values = [...imageFields];
    values.push({ image: "", altText: "", isFeature: false });
    setImageFields(values);
  };

  return (
    <>
      {imageFields.map((image, index) => (
        <Fragment key={`${image}~${index}`}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input color="secondary" type="file" name="Upload image" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Alternate Text"
                name="alt"
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Fragment>
      ))}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddCircleOutlineIcon />}
        onClick={handleAddImageField}
      >
        Add More
      </Button>
    </>
  );
};
export default ImageUploadForm;
