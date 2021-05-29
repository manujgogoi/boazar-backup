import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import Pagination from "@material-ui/lab/Pagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MGCircularProgress from "../../components/MGCircularProgress";
import ProductAddForm from "./ProductAddForm";

import axios from "axios";
import Cookies from "js-cookie";
import * as server from "../../utils/serverInfo";

const useStyles2 = makeStyles((theme) => ({
  tableContainer: {
    [theme.breakpoints.down("sm")]: {
      width: 440,
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  table: {
    minWidth: 500,
  },
  controlWrapper: {
    marginBottom: theme.spacing(1),
    padding: 10,
  },
}));

export default function ProductsTable() {
  const classes = useStyles2();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");

  // const [progress, setProgress] = useState([]);

  const [addFormOpen, setAddFormOpen] = useState(false);

  const handleAddFormOpen = () => {
    setAddFormOpen(true);
  };

  const token = Cookies.get("token");
  // Load products on component mount
  useEffect(() => {
    setProductLoading(true);
    let cancel;
    axios
      .get(
        `${server.SERVER_URL}/api/store/products/?page=${page}&search=${search}`,
        {
          headers: { Authorization: `Token ${token}` },
          // onDownloadProgress: (progressEvent) => {
          //   const { loaded, total } = progressEvent;
          //   let percent = Math.floor((loaded * 100) / total);
          //   console.log(
          //     `status : ${loaded / 1024} kb of ${total / 1024} kb | ${percent}%`
          //   );
          //   // setProgress(percent);
          // },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      )
      .then((res) => {
        setProducts(res.data.results);
        setTotalProducts(res.data.count);
        setTotalPages(Math.ceil(res.data.count / rowsPerPage));
        setProductLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [page, search]);

  const formatDate = (date) => {
    let dateObj = new Date(date);
    return (
      dateObj.getDate() + "-" + dateObj.getMonth() + "-" + dateObj.getFullYear()
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = (event, value) => {
    setPage(1);
    setSearch(searchField);
  };

  return (
    <div>
      <Paper className={classes.controlWrapper}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              size="small"
              onChange={handleSearchChange}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Grid>
          <Grid item>
            <button onClick={handleAddFormOpen}>Add</button>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Pagination
              className={classes.pagination}
              count={totalPages}
              color="primary"
              variant="text"
              shape="rounded"
              defaultPage={1}
              showFirstButton
              showLastButton
              onChange={(event, value) => {
                handleChangePage(event, value);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          className={classes.table}
          size="small"
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Title</TableCell>
              <TableCell align="right">Regular Price (Rs)</TableCell>
              <TableCell align="right">Discounted Price (Rs)</TableCell>
              <TableCell align="right">Wholesale Price (Rs)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          {productLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <MGCircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {products.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 80 }}>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.regular_price}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.discounted_price}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.wholesale_price}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell>{formatDate(row.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Products: {totalProducts}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ProductAddForm
        open={addFormOpen}
        setOpen={setAddFormOpen}
        title="Add Product"
      />
    </div>
  );
}
