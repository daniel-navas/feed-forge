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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const topics_1 = __importDefault(require("./topics"));
const getRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics_1.default.length);
    return topics_1.default[randomIndex];
};
const getRandomTopics = (count) => {
    const shuffled = topics_1.default.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((topic) => topic.id);
};
const getTopicsForPreset = (presetTopics) => {
    if (presetTopics.length === 0) {
        return getRandomTopics(5);
    }
    let topicsToUse = [...presetTopics];
    topicsToUse.push(getRandomTopic().id);
    return topicsToUse;
};
const PhotoFeed = ({ selectedPreset, presets, addTopicToPreset }) => {
    const [photos, setPhotos] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const useStaticImages = false;
    const fallbackImages = [
        { urls: { regular: 'https://plus.unsplash.com/premium_photo-1721830498757-ebc68f215580' }, topic_submissions: {}, topics_list: ['Fallback Topic 1'] },
        { urls: { regular: 'https://plus.unsplash.com/premium_photo-1721830498757-ebc68f215580' }, topic_submissions: {}, topics_list: ['Fallback Topic 2'] },
    ];
    const fetchPhotos = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        if (useStaticImages) {
            setPhotos(fallbackImages);
            setLoading(false);
            return;
        }
        try {
            const preset = presets.find((p) => p.name === selectedPreset);
            const presetTopics = (preset === null || preset === void 0 ? void 0 : preset.topics) || [];
            let topicsToUse = getTopicsForPreset(presetTopics);
            const topicsParam = topicsToUse.join(',');
            const url = `http://localhost:4000/api/random-image?count=10&topics=${topicsParam}`;
            //const url = `https://feedforge-1fxj--4000--41692973.local-credentialless.webcontainer.io/api/random-image?count=10&topics=${topicsParam}`;
            const response = yield axios_1.default.get(url);
            if (Array.isArray(response.data)) {
                const fetchedPhotos = response.data.map((photo) => {
                    const topicSubmissionKeys = Object.keys(photo.topic_submissions).filter((key) => topics_1.default.some((topic) => topic.slug === key) && photo.topic_submissions[key].status === 'approved');
                    const topicsList = topicSubmissionKeys.map((key) => { var _a; return ((_a = topics_1.default.find((t) => t.slug === key)) === null || _a === void 0 ? void 0 : _a.slug) || 'Unknown'; });
                    return Object.assign(Object.assign({}, photo), { topics_list: topicsList });
                });
                setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
            }
            else {
                setError('Unexpected response format');
                setPhotos(fallbackImages);
            }
        }
        catch (error) {
            console.error('Error fetching images from Unsplash:', error);
            setError('Error fetching the images, using fallback images');
            setPhotos(fallbackImages);
        }
        finally {
            setLoading(false);
        }
    });
    const handleLike = (topicSubmissions) => {
        const likedTopics = Object.keys(topicSubmissions).filter((key) => topics_1.default.some((topic) => topic.slug === key) && topicSubmissions[key].status === 'approved');
        likedTopics.forEach((topic) => {
            const topicObject = topics_1.default.find((t) => t.slug === topic);
            if (topicObject) {
                addTopicToPreset(selectedPreset, topicObject.id);
            }
        });
    };
    (0, react_1.useEffect)(() => {
        setPhotos([]);
        fetchPhotos();
    }, [selectedPreset]);
    return (react_1.default.createElement("div", { className: "photo-feed" },
        photos.map((photo, index) => (react_1.default.createElement("div", { key: index, className: "photo-item" },
            react_1.default.createElement("img", { src: photo.urls.regular, alt: `Photo ${index + 1}` }),
            react_1.default.createElement("div", { className: "photo-details" },
                react_1.default.createElement("button", { className: "like-button", onClick: () => handleLike(photo.topic_submissions) }, "\u2764\uFE0F Like"),
                react_1.default.createElement("div", { className: "topics-list" }, photo.topics_list.map((topic, idx) => (react_1.default.createElement("p", { key: idx }, topic)))))))),
        loading && react_1.default.createElement("div", null, "Loading..."),
        error && react_1.default.createElement("div", null, error),
        react_1.default.createElement("button", { onClick: fetchPhotos, disabled: loading }, "Load More Photos")));
};
exports.default = PhotoFeed;
