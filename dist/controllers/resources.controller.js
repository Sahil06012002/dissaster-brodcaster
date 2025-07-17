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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearbyResourcesByGeography = exports.getNearbyResourcesByDisaster = exports.getAllResources = exports.deleteResource = exports.addResource = void 0;
const resourcesService = __importStar(require("../services/resources.service"));
const addResource = async (req, res, next) => {
    try {
        console.log("req.body");
        console.log(req.body);
        const { name, resource_type, location } = req.body;
        const address = location.address;
        const lat = location.lat;
        const lng = location.lng;
        const geometryWKT = `POINT(${lng} ${lat})`;
        const resourceData = {
            ...req.body,
            location: address,
            coordinates: geometryWKT,
        };
        if (!name || !resource_type || !location) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["name", "resource_type", "location"],
            });
        }
        const newResource = await resourcesService.addResource(resourceData);
        res.status(201).json({
            message: "Resource added successfully",
            data: newResource,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addResource = addResource;
const deleteResource = async (req, res, next) => {
    try {
        const { id } = req.params;
        await resourcesService.deleteResource(id);
        res.status(200).json({
            message: "Resource deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteResource = deleteResource;
const getAllResources = async (req, res, next) => {
    try {
        const resources = await resourcesService.getAllResources();
        res.json({
            message: "Resources retrieved successfully",
            data: resources,
            count: resources.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllResources = getAllResources;
const getNearbyResourcesByDisaster = async (req, res, next) => {
    try {
        console.log("getNearbyResourcesByDisaster");
        console.log("req.query");
        console.log(req.query);
        const { disasterId, radiusKm } = req.query;
        console.log("disasterId");
        console.log(disasterId);
        console.log("radiusKm");
        console.log(radiusKm);
        if (!disasterId) {
            return res
                .status(400)
                .json({ error: "Missing disasterId query parameter" });
        }
        const resources = await resourcesService.findNearbyResourcesByDisasterId(disasterId, radiusKm ? Number(radiusKm) : 10);
        res.json({
            message: "Nearby resources retrieved successfully",
            data: resources,
            count: resources.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getNearbyResourcesByDisaster = getNearbyResourcesByDisaster;
const getNearbyResourcesByGeography = async (req, res, next) => {
    try {
        const { geographyBinary, radiusKm, resourceType } = req.body;
        if (!geographyBinary) {
            return res
                .status(400)
                .json({ error: "Missing geographyBinary in request body" });
        }
        const resources = await resourcesService.findNearbyResourcesByGeography(geographyBinary, radiusKm ? Number(radiusKm) : 10, resourceType);
        res.json({
            message: "Nearby resources retrieved successfully",
            data: resources,
            count: resources.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getNearbyResourcesByGeography = getNearbyResourcesByGeography;
