import React, { useState } from "react";
import * as yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import AppBar from "@mui/material/AppBar";
import { useFormik } from "formik";
import Dialog from "../common/Dialog";
import SubjectForm from "./SubjectForm";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TrashIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { routes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
const columns = ({ handleRecord }) => [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstname") || ""} ${
        params.getValue(params.id, "lastname") || ""
      }`,
  },
  {
    field: "age",
    headerName: "Age",
    sortable: true,
    type: "number",
    width: 90,
  },
  {
    field: "weight",
    headerName: "Weight",
    sortable: true,
    width: 80,
    sortable: true,
  },
  {
    field: "height",
    headerName: "Height",
    sortable: true,
    width: 80,
    sortable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        return handleRecord(thisRow);
      };

      return (
        <span>
          <Button onClick={onClick}>Record</Button>
        </span>
      );
    },
  },
];

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your firstname")
    .required("Firstname is required"),
  lastname: yup
    .string("Enter your firstname")
    .required("Firstname is required"),
  height: yup.number("Enter your height").required("Height is required"),
  weight: yup.number("Enter your weight").required("Weight is required"),
  age: yup.number("Enter your age").required("Age is required"),
});

function SubjectGridUi(props) {
  const isEdit = false;
  const navigate = useNavigate();
  const [selectedItems, updateSelectedItems] = useState([]);
  const { subjects, dialogState, handleClose, handleOpen } = props;
  const { subject = {}, create, update, remove, fetch } = props;
  const formik = useFormik({
    initialValues: {
      firstname: subject.firstname || "",
      lastname: subject.lastname || "",
      age: subject.age || 0,
      height: subject.height || 0,
      weight: subject.weight || 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let promise = null;
      let handleCloseFn = (f) => f;
      if (isEdit) {
        handleCloseFn = handleClose(dialogState.update.name);
        promise = update(subject.id, values);
      } else {
        handleCloseFn = handleClose(dialogState.create.name);
        promise = create(values);
      }
      promise
        .then(() => {
          formik.resetForm();
          handleCloseFn();
        })
        .catch((err) => {})
        .finally(() => {});
    },
  });
  const handleDeleteClick = () => {
    Promise.all(selectedItems.map((selectedItem) => remove(selectedItem)))
      .then(() => {})
      .finally(() => {
        fetch();
      });
  };
  const handleRecord = (value) => {
    const url = routes.GAIT_LOGGER.url.replace(":subjectId", value.id);
    navigate(url);
  };
  const tableColumns = columns({ handleRecord });
  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Subjects
          </Typography>
          <IconButton
            edge="start"
            color="success"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={() => handleOpen(dialogState.create.name)}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="error"
            aria-label="menu"
            onClick={handleDeleteClick}
            sx={{ ml: 1 }}
          >
            <TrashIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DataGrid
        rows={subjects}
        pageSize={100}
        columns={tableColumns}
        checkboxSelection
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(newSelectionModel) => {
          updateSelectedItems(newSelectionModel);
        }}
        selectionModel={selectedItems}
      />
      <Dialog
        dialogTitle="Create Subject"
        open={dialogState.create.value}
        handleClose={() => handleClose(dialogState.create.name)}
        handleSave={formik.handleSubmit}
      >
        <SubjectForm formik={formik} />
      </Dialog>
    </div>
  );
}

export default SubjectGridUi;
