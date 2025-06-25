import * as reportRepository from "../repository/report.repository";
import { Report } from "../interfaces/report.interface";

export const addReports = async (reportData: Report) => {
  const newReport: Report = {
    ...reportData,
    created_at: new Date().toISOString(),
  };
  return await reportRepository.addReport(newReport);
};

export const getReportsByDisasterId = async (disaster_id: number) => {
  return await reportRepository.getReportsByDisasterId(disaster_id);
};
