import PropTypes from 'prop-types'
import { getIn, FieldArray } from 'formik';

import { Box, Card, Grid, Stack, Button, TextField, Typography } from '@mui/material';

function KeyFeatureTable(
    {
        sx = {},
        tableData,
        touched,
        errors,
        handleChange,
        handleBlur,
    }
) {
    return (
        <Card sx={{ px: 3, py: 3, ...sx }}>
            <Stack
                direction='row'
                justifyContent='space-between'

            >
                <Typography variant='h6' color="primary">
                    Key Features
                </Typography>
            </Stack>
            <FieldArray name='key_features'>
                {
                    ({ push, remove }) => (
                        <Box>
                            {
                                tableData.specs.map((spec, idx) => {
                                    const spec_title = `key_features[${idx}].title`;
                                    const spec_value = `key_features[${idx}].value`;
                                    const label_error = getIn(errors, spec_title);
                                    const label_touched = getIn(touched, spec_title);
                                    const value_error = getIn(errors, spec_value);
                                    const value_touched = getIn(touched, spec_value);
                                    return (
                                        <Grid key={`spec${idx}`} container spacing={2} sx={{ mt: 0.1 }} alignItems='flex-end'>
                                            <Grid item xs={4}>
                                                <TextField
                                                    label="Feature Title"
                                                    fullWidth
                                                    variant='standard'
                                                    name={spec_title}
                                                    onChange={handleChange}
                                                    value={spec.label}
                                                    onBlur={handleBlur}
                                                    error={label_touched && Boolean(label_error)}
                                                    helperText={label_touched && Boolean(label_error) ? label_error : ""}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={7}>
                                                <TextField
                                                    label="Feature"
                                                    fullWidth
                                                    variant='standard'
                                                    name={spec_value}
                                                    onChange={handleChange}
                                                    value={spec.value}
                                                    onBlur={handleBlur}
                                                    error={value_touched && Boolean(value_error)}
                                                    helperText={value_touched && Boolean(value_error) ? value_error : ""}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button onClick={() => remove(idx)} variant='outlined' color='warning' size='small'>Remove</Button>
                                            </Grid>

                                        </Grid>
                                    )
                                })
                            }
                            <Button
                                sx={{ mt: 2 }}
                                variant='outlined'
                                color='success'
                                size='small'
                                onClick={() => { push({ title: '', value: '' }) }}
                            >
                                Add Feature Row
                            </Button>
                        </Box>
                    )
                }
            </FieldArray>

        </Card>
    )
}

export default KeyFeatureTable;

KeyFeatureTable.propTypes = {
    sx: PropTypes.object,
    tableData: PropTypes.any,
    touched: PropTypes.any,
    errors: PropTypes.any,
    handleChange: PropTypes.any,
    handleBlur: PropTypes.any,
}