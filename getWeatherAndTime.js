"use strict";
// Given an array of inputs (location name, postal code), log the current time and weather for those locations.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// the fetch api is used to fetch https requests
var fetchUrl = require("node-fetch");
var apiKey = "40468bc9c23beec2e5a6af80ceca0e10";
function getLocationType(location) {
    var zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (zipCodeRegex.test(location)) {
        return "Zip";
    }
    else {
        return "Name";
    }
}
// Note: getWeatherAtOneLocation assumes location is a zip code or city name
function getWeatherAtOneLocation(location) {
    return __awaiter(this, void 0, void 0, function () {
        var locType, weatherApiUrl, response, weatherJson, localUnixDate, localTimeOffset, currentDate, dateInUtcSeconds, localDateSeconds, localDate, message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locType = getLocationType(location);
                    weatherApiUrl = (locType == "Zip")
                        ? "https://api.openweathermap.org/data/2.5/weather?zip=" + location + ",us&units=imperial&appid=" + apiKey
                        : "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + apiKey;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetchUrl(weatherApiUrl)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    weatherJson = _a.sent();
                    localUnixDate = parseInt(weatherJson.dt);
                    localTimeOffset = parseInt(weatherJson.timezone);
                    currentDate = new Date();
                    dateInUtcSeconds = (currentDate.getTime() + 6 * 60 * 60 * 1000) / 1000;
                    localDateSeconds = dateInUtcSeconds + localTimeOffset;
                    localDate = new Date(0);
                    localDate.setUTCSeconds(localDateSeconds);
                    message = "It's " + weatherJson.main.temp + " degrees Farenheit and " + weatherJson.weather[0].description + " in " + weatherJson.name + " and the time is " + localDate.getHours() + ":" + localDate.getMinutes() + ":" + localDate.getSeconds() + "\n";
                    console.log(message);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    // console.error(error);
                    console.log("Data for " + location + " could not be found");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getWeatherForAll(locations) {
    console.log(locations.map(getWeatherAtOneLocation));
}
// test all zip codes
var testLocations_1 = ["94087", "21401", "37086"];
// test mix of zip codes and city names
var testLocations_2 = ["New York", "10005", "Tokyo", "Sao Paulo", "Pluto"];
// test mix of valid and invalid zip codes
var testLocations_3 = ["21401", "2"];
// test empty input array
var testLocations_4 = [];
// test invalid city name
var testLocations_5 = ["aaaaaaaaaaaaaaaaaa"];
getWeatherForAll(testLocations_1);
getWeatherForAll(testLocations_2);
getWeatherForAll(testLocations_3);
getWeatherForAll(testLocations_4);
getWeatherForAll(testLocations_5);
