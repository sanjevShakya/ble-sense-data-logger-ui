import crudService from "./crudService";
import endpoints from "../constants/endpoints";

const gaitRecordService = new crudService(endpoints.GAIT_RECORD);

export default {
  ...gaitRecordService,
};
