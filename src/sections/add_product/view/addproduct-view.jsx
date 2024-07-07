import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, getIn, Formik, FieldArray } from 'formik'

import {
  Box, Chip, Card, Grid, Stack, Button, Container, TextField, Typography,
} from '@mui/material';

import { all_tags } from 'src/_mock/products';

import ConfigTable from '../config-table';
import AddTagModal from '../add-tag-modal';
import ProductImages from '../product-images';
import KeyFeatureTable from '../keyfeature-table';

const tables = [
  {
    id: 1,
    title: 'Table1 Demo',
    specs: [
      {
        id: 97,
        title: 'Demo Spec 1',
        value: ''
      },
      {
        id: 98,
        title: 'Demo Spec 2',
        value: ''
      },
    ]
  },
  {
    id: 2,
    title: 'Table2 Demo',
    specs: [
      {
        id: 99,
        title: 'Demo Spec 3',
        value: ''
      },
      {
        id: 100,
        title: 'Demo Spec 4',
        value: ''
      },
    ]
  }
]


function AddProductView({ slug }) {
  const [images, setImages] = useState([])
  const [tagsModalOpen, setTagsModalOpen] = useState(false);

  const validationSchema = Yup.object({
    product_title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").min(0, 'Cannot be less than 0'),
    discount_price: null,
    stock_count: Yup.number().required("Stock count is required").min(0, 'Cannot be less than 0'),
    key_features: Yup.array(
      Yup.object({
        label: Yup.string().required('Title is required'),
      })
    ),
  })

  return (
    <Container>
      <Typography variant='h4'>Add New Product in <Typography variant='h4' color="secondary" component="span">{slug}</Typography> Category</Typography>
      <Formik
        initialValues={{
          product_title: '',
          price: '',
          discount_price: '',
          stock_count: '',
          tags: [],
          key_features: [
            {
              label: '',
              value: '',
            }
          ],
          table: tables
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {
          ({ values, touched, errors, handleChange, handleBlur }) => {
            const title_error = getIn(errors, 'product_title');
            const title_touched = getIn(touched, 'product_title');
            const price_error = getIn(errors, 'price');
            const price_touched = getIn(touched, 'price');
            const stock_error = getIn(errors, 'stock_count');
            const stock_touched = getIn(touched, 'stock_count');
            return (
              <Form noValidate>
                <Card sx={{ px: 2, py: 3, mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Product Title"
                            name='product_title'
                            variant='filled'
                            multiline
                            rows={2}
                            value={values.product_title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={title_touched && Boolean(title_error)}
                            helperText={title_touched && Boolean(title_error) ? title_error : ''}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='price'
                            label="Original Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={price_touched && Boolean(price_error)}
                            helperText={price_touched && Boolean(price_error) ? price_error : ''}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='discount_price'
                            label="Discount Price"
                            value={values.discount_price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='stock_count'
                            label="Stock Count"
                            value={values.stock_count}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={stock_touched && Boolean(stock_error)}
                            helperText={stock_touched && Boolean(stock_error) ? stock_error : ''}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant='body1'>Tags</Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 1,
                              mt: 1
                            }}
                          >
                            <FieldArray name="tags">
                              {
                                ({ push, remove }) => (
                                  <>
                                    <AddTagModal
                                      open={tagsModalOpen}
                                      setOpen={setTagsModalOpen}
                                      all_tags={all_tags}
                                      added_tags={values.tags}
                                      push={push}
                                      remove={remove}
                                    />
                                    {
                                      values.tags.map((t, idx) => (
                                        <Chip
                                          key={t}
                                          label={all_tags.find(tag => tag.slug === t).title}
                                          onDelete={() => remove(idx)}
                                        />
                                      ))
                                    }
                                  </>
                                )
                              }

                            </FieldArray>
                            <Chip
                              variant='contained'
                              color='primary'
                              label="Add Tag"
                              onClick={() => setTagsModalOpen(true)}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant='body1'>Product Images</Typography>
                      <ProductImages
                        images={images}
                        setImages={setImages}
                      />
                    </Grid>
                  </Grid>
                </Card>
                <KeyFeatureTable
                  tableData={{ specs: values.key_features }}
                  sx={{ mt: 2 }}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <Typography
                  textAlign="center"
                  variant='h6'
                  sx={{mt: 4}}
                >
                  Product Configurations
                </Typography>
                {
                  values.table.map((tbl, idx) => (
                    <ConfigTable
                      key={`table[${idx}]`}
                      tableData={tbl}
                      tableIndex={idx}
                      sx={{ mt: 2 }}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  ))
                }
                <Card
                  sx={{ p: 2, mt: 3 }}
                >
                  <Box>
                    <TextField
                      label="Product Description"
                      fullWidth
                      multiline
                      rows={5}
                    />
                  </Box>
                </Card>
                <Stack direction='row' justifyContent='flex-end' sx={{ mt: 2 }}>
                  <Button variant='contained' type='submit' >Add Product</Button>
                </Stack>
              </Form>
            )
          }
        }
      </Formik>
    </Container>
  )
}

export default AddProductView;

AddProductView.propTypes = {
  slug: PropTypes.string
}