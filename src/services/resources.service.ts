import * as resourcesRepository from "../repository/resources.repository";
import { Resource } from "../interfaces/resources.interface";
import supabase from "../supabaseClient";

export const addResource = async (resourceData: Resource) => {
  const newResource: Resource = {
    ...resourceData,
    created_at: new Date().toISOString(),
  };
  return await resourcesRepository.addResource(newResource);
};

export const deleteResource = async (id: string) => {
  return await resourcesRepository.deleteResource(id);
};

export const getAllResources = async () => {
  return await resourcesRepository.getAllResources();
};

export const findNearbyResourcesByDisasterId = async (
  disasterId: string,
  radiusKm = 10
) => {
  const { data, error } = await supabase.rpc(
    "find_nearby_resources_by_disaster",
    {
      disaster_id: disasterId,
      radius_km: radiusKm,
    }
  );
  console.log("data");
  console.log(data);
  console.log("error");
  console.log(error); 
  if (error) throw error;
  return data;
};

export const findNearbyResourcesByGeography = async (
  geographyBinary: string,
  radiusKm = 10,
  resourceType?: string
) => {
  const { data, error } = await supabase.rpc(
    "find_nearby_resources_by_geography",
    {
      location_geography: geographyBinary,
      radius_km: radiusKm,
      resource_type_filter: resourceType ?? null,
    }
  );
  if (error) throw error;
  return data;
};
