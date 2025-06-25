import * as disasterRepository from "../repository/disaster.repository";
import { Disaster } from "../interfaces/disaster.interface";

export const submitDisaster = async (disasterData: Disaster) => {
  const newDisaster: Disaster = {
    ...disasterData,
    created_at: new Date().toISOString(),
  };
  return await disasterRepository.submitDisaster(newDisaster);
};

export const getAllDisasters = async () => {
  const reports = await disasterRepository.getAllDisasters();
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

export const getDisasterById = async (id: string) => {
  return await disasterRepository.getDisasterById(id);
};

export const updateDisaster = async (
  id: string,
  disasterData: Partial<Disaster>
) => {
  const updatedReport: Partial<Disaster> = {
    ...disasterData,
    updated_at: new Date().toISOString(),
  };
  return await disasterRepository.updateDisaster(id, updatedReport);
};

export const deleteDisaster = async (id: string) => {
  return await disasterRepository.deleteDisaster(id);
};
