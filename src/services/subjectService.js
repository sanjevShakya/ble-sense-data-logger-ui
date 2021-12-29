import crudService from "./crudService";
import endpoints from "../constants/endpoints";

const subjectService = new crudService(endpoints.SUBJECT);

export default subjectService;
