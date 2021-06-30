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
  const [deleteorderseq, setdeleteorderseq] = useState();
  const [keyword, setKeyword] = useState();
  const Allproducts = () => {
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/all-order.php', {
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
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/search-order.php', {
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
  const changedeleteorderseq = (e) => {
    setdeleteorderseq(e.target.value);
  };
  const Deleteproducts = () => {
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/delete-order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deleteorderseq })
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
    fetch('https://fs.mis.kuas.edu.tw/~C107156125/react/add-order.php', {
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
        <TableRow key={product.seq}>
          <TableCell>{product.seq}</TableCell>
          <TableCell>{product.OrderId}</TableCell>
          <TableCell>{product.EmpId}</TableCell>
          <TableCell>{product.CustId}</TableCell>
          <TableCell>{product.OrderDate}</TableCell>
          <TableCell>{product.Descript}</TableCell>
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
                    placeholder="Search CustId"
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
                    Search OrderId
                  </Button>
                  {' '}
                  <TextField
                    sx={{ minWidth: 100, minHeight: 50 }}
                    placeholder="seq"
                    variant="outlined"
                    onChange={changedeleteorderseq}
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
          <TextField
            sx={{ minWidth: 150 }}
            placeholder="seq"
            variant="outlined"
            color="secondary"
            name="seq"
            onChange={changeaddProduct}
          />
          {' '}
          <TextField
            sx={{ minWidth: 150 }}
            placeholder="OrderId"
            variant="outlined"
            color="secondary"
            name="OrderId"
            onChange={changeaddProduct}
          />
          {' '}
          <TextField
            sx={{ minWidth: 150 }}
            placeholder="EmpId"
            variant="outlined"
            color="secondary"
            name="EmpId"
            onChange={changeaddProduct}
          />
          {' '}
          <TextField
            sx={{ minWidth: 150 }}
            placeholder="CustId"
            variant="outlined"
            color="secondary"
            name="CustId"
            onChange={changeaddProduct}
          />
          {' '}
          <TextField
            sx={{ minWidth: 150 }}
            placeholder="OrderDate"
            variant="outlined"
            color="secondary"
            name="OrderDate"
            onChange={changeaddProduct}
          />
          {' '}
          <TextField
            sx={{ minWidth: 150 }}
            placeholder="Descript"
            variant="outlined"
            color="secondary"
            name="Descript"
            onChange={changeaddProduct}
          />
          {' '}
          <Button
            sx={{ minWidth: 150, minHeight: 55 }}
            variant="contained"
            color="primary"
            onClick={Addproducts}
          >
            insert order
          </Button>
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        seq
                      </TableCell>
                      <TableCell>
                        OrderId
                      </TableCell>
                      <TableCell>
                        EmpId
                      </TableCell>
                      <TableCell>
                        CustId
                      </TableCell>
                      <TableCell>
                        OrderDate
                      </TableCell>
                      <TableCell>
                        Descript
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list}
                  </TableBody>
                </Table>
              </PerfectScrollbar>
            </Card>
          </Box>
        </Container>
      </Box>

    </>
  );
};
export default CustomerList;
