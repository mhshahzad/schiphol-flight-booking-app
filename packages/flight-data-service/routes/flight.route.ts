import express from "express";
import axios from "axios";

const router = express.Router();
const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:5000";

