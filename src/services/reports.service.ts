import * as reportsRepository from "../repository/reports.repository";
import { Report } from "../interfaces/reports.interface";

export const createReport = async (reportData: Report) => {
  const newReport: Report = {
    ...reportData,
    created_at: new Date().toISOString(),
  };
  return await reportsRepository.createReport(newReport);
};

export const getAllReports = async () => {
  const reports = await reportsRepository.getAllReports();
  if (!reports) {
    return [];
  }
  return reports.map((report: any) => {
    return {
      ...report,
      userName: report.Users?.name || "anonymous",
      Users: undefined,
    };
  });
};

export const getReportById = async (id: string) => {
  return await reportsRepository.getReportById(id);
};

export const updateReport = async (id: string, reportData: Partial<Report>) => {
  const updatedReport: Partial<Report> = {
    ...reportData,
    updated_at: new Date().toISOString(),
  };
  return await reportsRepository.updateReport(id, updatedReport);
};

export const deleteReport = async (id: string) => {
  return await reportsRepository.deleteReport(id);
};
