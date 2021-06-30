import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search as SearchIcon } from 'react-feather';

const CustomerList = () => {
  const [productList, setProductList] = useState();
  const [deleteproductid, setdeleteproductid] = useState();
  const [keyword, setKeyword] = useState();
  const Allproducts = () => {
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/all-products.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProductList(data.users);
      })
      .catch((err) => {
        setProductList(err);
      });
  };
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const Searchproducts = () => {
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/search-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword })
    })
      .then((res) => res.json())
      .then((data) => {
        setProductList(data.product);
        console.log(productList);
      })
      .catch((err) => {
        console.log(err);
        setProductList(err);
      });
  };
  const changedeleteproductid = (e) => {
    setdeleteproductid(e.target.value);
  };
  const Deleteproducts = () => {
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/delete-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deleteproductid })
    })
      .then((res) => res.json())
      .then((data) => {
        Allproducts();
        alert(data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let addProduct = {};
  const changeaddProduct = (e) => {
    addProduct = {
      ...addProduct,
      [e.target.name]: e.target.value
    };
    console.log(addProduct);
  };
  const Addproducts = () => {
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/add-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addProduct)
    })
      .then((res) => res.json())
      .then((data) => {
        Allproducts();
        alert(data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let list = (<></>);
  if (productList) {
    const arr = (productList);
    console.log(productList);
    if (arr) {
      list = (arr.map((product) => (
        <TableRow key={product.product_id}>
          <TableCell>{product.product_name}</TableCell>
          <TableCell>{product.product_id}</TableCell>
          <TableCell>{product.product_price}</TableCell>
          <TableCell>{product.product_cost}</TableCell>
        </TableRow>
      ))
      );
    }
  }

  useEffect(() => {
    Allproducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>ProductFinal | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <TextField
                    sx={{ minWidth: 300, minHeight: 50 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search ProdName"
                    variant="outlined"
                    onChange={changeKeyword}
                  />
                  {' '}
                  <Button
                    sx={{ minWidth: 100, minHeight: 55 }}
                    variant="contained"
                    color="inherit"
                    onClick={Searchproducts}
                  >
                    Search products
                  </Button>
                  {' '}
                  <TextField
                    sx={{ minWidth: 100, minHeight: 50 }}
                    placeholder="ProdId"
                    variant="outlined"
                    onChange={changedeleteproductid}
                  />
                  {' '}
                  <Button
                    sx={{ minWidth: 100, minHeight: 55 }}
                    variant="contained"
                    color="secondary"
                    onClick={Deleteproducts}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        ProdName
                      </TableCell>
                      <TableCell>
                        ProdId
                      </TableCell>
                      <TableCell>
                        UnitPrice
                      </TableCell>
                      <TableCell>
                        Cost
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list}
                  </TableBody>
                </Table>
              </PerfectScrollbar>
              <TextField
                sx={{ minWidth: 250 }}
                placeholder="ProdName"
                variant="outlined"
                color="secondary"
                name="ProdName"
                onChange={changeaddProduct}
              />
              {' '}
              <TextField
                sx={{ minWidth: 250 }}
                placeholder="ProdId"
                variant="outlined"
                color="secondary"
                name="ProdID"
                onChange={changeaddProduct}
              />
              {' '}
              <TextField
                sx={{ minWidth: 250 }}
                placeholder="Unitprice"
                variant="outlined"
                color="secondary"
                name="UnitPrice"
                onChange={changeaddProduct}
              />
              {' '}
              <TextField
                sx={{ minWidth: 250 }}
                placeholder="Cost"
                variant="outlined"
                color="secondary"
                name="Cost"
                onChange={changeaddProduct}
              />
              {' '}
              <Button
                sx={{ minWidth: 250, minHeight: 55 }}
                variant="contained"
                color="primary"
                onClick={Addproducts}
              >
                insert product
              </Button>
            </Card>
          </Box>
        </Container>
      </Box>

    </>
  );
};
export default CustomerList;
