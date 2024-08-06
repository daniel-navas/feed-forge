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
const express_1 = __importDefault(require("express"));
const unsplash_1 = require("./unsplash");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Welcome to the Feed Forge API');
});
app.get('/api/random-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = req.query.topics;
    try {
        const images = yield (0, unsplash_1.getRandomImage)(topics);
        res.json(images);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching images from Unsplash' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});