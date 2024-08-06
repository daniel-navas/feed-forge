"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImage = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UNSPLASH_ACCESS_KEY = "bSsN2iYawUe7KaIazV1tpa8WxGZO3p3QxpaLqC6raeE";
const getRandomImage = (topics) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.unsplash.com/photos/random?count=10&topics=${topics}`;
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        throw error;
    }
});
exports.getRandomImage = getRandomImage;
