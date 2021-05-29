import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import * as server from "../../utils/serverInfo";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const SpecificationForm = (props) => {
  const { productType } = props;
  const classes = useStyles();
  const [fields, setFields] = useState([{ specification: "", value: "" }]);
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    if (productType) {
      axios
        .get(
          `${server.SERVER_URL}/api/store/specifications/type/${productType}`
        )
        .then((res) => setSpecifications(res.data))
        .catch((err) => console.log("Error : ", err));
    }
    return () => {};
  }, [productType]);

  const handleFieldChange = (index, event) => {
    const values = [...fields];
    if (event.target.name === "specification") {
      values[index].specification = event.target.value;
    } else {
      values[index].value = event.target.value;
    }
    setFields(values);
  };

  const handleAddField = () => {
    const values = [...fields];
    values.push({ specification: "", value: "" });
    setFields(values);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  return (
    <>
      {fields.map((field, index) => (
        <Fragment key={`${field}~${index}`}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="select-specification-label">
                  Specification
                </InputLabel>
                <Select
                  labelId="select-specification-label"
                  id="select-specification"
                  name="specification"
                  value={field.specification}
                  onChange={(event) => handleFieldChange(index, event)}
                  label="Specification"
                  disabled={productType ? false : true}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {specifications.map((spec) => (
                    <MenuItem key={spec.id} value={spec.id}>
                      {spec.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                size="small"
                id="specification-value"
                label="Value"
                name="value"
                value={field.value}
                onChange={(event) => handleFieldChange(index, event)}
                variant="outlined"
                disabled={productType ? false : true}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveField(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      ))}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddCircleOutlineIcon />}
        onClick={handleAddField}
      >
        Add more
      </Button>
    </>
  );
};

export default SpecificationForm;
