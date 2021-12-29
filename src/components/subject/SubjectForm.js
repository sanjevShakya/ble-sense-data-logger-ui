import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function SubjectFormUi(props) {
  const { formik } = props;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Grid container spacing={1} columns={12}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="firstname"
              name="firstname"
              label="Firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              helperText={formik.touched.firstname && formik.errors.firstname}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="lastName"
              name="lastname"
              label="Lastname"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              helperText={formik.touched.lastName && formik.errors.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              helperText={formik.touched.age && formik.errors.age}
              error={formik.touched.age && Boolean(formik.errors.age)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="height"
              name="height"
              label="height"
              type="number"
              value={formik.values.height}
              onChange={formik.handleChange}
              helperText={formik.touched.height && formik.errors.height}
              error={formik.touched.height && Boolean(formik.errors.height)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="weight"
              name="weight"
              label="weight"
              type="number"
              value={formik.values.weight}
              onChange={formik.handleChange}
              helperText={formik.touched.weight && formik.errors.weight}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
            />
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

export default SubjectFormUi;
