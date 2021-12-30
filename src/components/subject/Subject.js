import React, { useEffect, useState } from "react";

import SubjectGrid from "./SubjectGrid";

import subjectService from "../../services/subjectService";

function SubjectUi(props) {
  return (
    <div>
      <SubjectGrid {...props}></SubjectGrid>
    </div>
  );
}

const dialogState = {
  create: {
    name: "create",
    value: false,
  },
  update: {
    name: "update",
    value: false,
  },
};

function Subject() {
  const [isLoading, updateIsLoading] = useState(false);
  const [subjects, updateSubjects] = useState([]);
  const [dialog, setDialogState] = React.useState(dialogState);

  const handleClose = (dialogName) => {
    setDialogState({
      ...dialog,
      [dialogName]: {
        ...dialog[dialogName],
        value: false,
      },
    });
  };

  const handleOpen = (dialogName) => {
    setDialogState({
      ...dialog,
      [dialogName]: {
        ...dialog[dialogName],
        value: true,
      },
    });
  };

  const fetchSubjects = () => {
    updateIsLoading(true);
    return subjectService
      .get()
      .then(({ data }) => {
        updateSubjects(data.data.map((val) => ({ ...val, id: val._id })));
      })
      .finally(() => {
        updateIsLoading(false);
      });
  };
  const updateSubject = (id, subject) => {
    return subjectService.put(id, subject).then(() => {
      fetchSubjects();
    });
  };

  const createSubject = (subject) => {
    return subjectService.post(subject).then(() => {
      fetchSubjects();
    });
  };

  const removeSubject = (subjectId) => {
    return subjectService.delete(subjectId);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <SubjectUi
      subjects={subjects}
      dialogState={dialog}
      fetch={fetchSubjects}
      create={createSubject}
      update={updateSubject}
      remove={removeSubject}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleOpen={handleOpen}
    />
  );
}

export default Subject;
