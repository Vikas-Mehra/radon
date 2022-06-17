const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");
const memeController = require("../controllers/memeController");
const cowinController = require("../controllers/cowinController");

router.get("/getStates", cowinController.getStates);
router.get("/getDistricts/:stateId", cowinController.getDistricts);
router.get("/getByPin", cowinController.getByPin);
router.get("/getOtp", cowinController.getOtp);
router.get("/getVaccination", cowinController.getVaccination);

router.get("/weather", weatherController.getWeather);
router.get("/onlyTemp", weatherController.onlyTemp);
router.get("/sortCitiesTemp", weatherController.SortedByTemp);

router.get("/getAllMemes", memeController.getAllMemes);
router.post("/editor", memeController.Editor);

module.exports = router;
