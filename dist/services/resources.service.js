"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNearbyResourcesByGeography = exports.findNearbyResourcesByDisasterId = exports.getAllResources = exports.deleteResource = exports.addResource = void 0;
const resourcesRepository = __importStar(require("../repository/resources.repository"));
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const addResource = async (resourceData) => {
    const newResource = {
        ...resourceData,
        created_at: new Date().toISOString(),
    };
    return await resourcesRepository.addResource(newResource);
};
exports.addResource = addResource;
const deleteResource = async (id) => {
    return await resourcesRepository.deleteResource(id);
};
exports.deleteResource = deleteResource;
const getAllResources = async () => {
    return await resourcesRepository.getAllResources();
};
exports.getAllResources = getAllResources;
const findNearbyResourcesByDisasterId = async (disasterId, radiusKm = 10) => {
    const { data, error } = await supabaseClient_1.default.rpc("find_nearby_resources_by_disaster", {
        disaster_id: disasterId,
        radius_km: radiusKm,
    });
    console.log("data");
    console.log(data);
    console.log("error");
    console.log(error);
    if (error)
        throw error;
    return data;
};
exports.findNearbyResourcesByDisasterId = findNearbyResourcesByDisasterId;
const findNearbyResourcesByGeography = async (geographyBinary, radiusKm = 10, resourceType) => {
    const { data, error } = await supabaseClient_1.default.rpc("find_nearby_resources_by_geography", {
        location_geography: geographyBinary,
        radius_km: radiusKm,
        resource_type_filter: resourceType ?? null,
    });
    if (error)
        throw error;
    return data;
};
exports.findNearbyResourcesByGeography = findNearbyResourcesByGeography;
