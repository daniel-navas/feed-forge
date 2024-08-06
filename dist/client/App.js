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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Menu_1 = __importDefault(require("./Menu"));
const Feed_1 = __importDefault(require("./Feed"));
require("./App.css");
const App = () => {
    const [presets, setPresets] = (0, react_1.useState)([{ name: 'Default', topics: [] }]);
    const [selectedPreset, setSelectedPreset] = (0, react_1.useState)('Default');
    const addPreset = (presetName) => {
        setPresets([...presets, { name: presetName, topics: [] }]);
    };
    const selectPreset = (presetName) => {
        setSelectedPreset(presetName);
    };
    const addTopicToPreset = (presetName, topicId) => {
        setPresets((prevPresets) => prevPresets.map((preset) => {
            if (preset.name === presetName) {
                const newTopics = [...preset.topics, topicId];
                if (newTopics.length > 5) {
                    newTopics.shift();
                }
                return Object.assign(Object.assign({}, preset), { topics: newTopics });
            }
            return preset;
        }));
    };
    return (react_1.default.createElement("div", { className: "app-container" },
        react_1.default.createElement(Menu_1.default, { presets: presets, addPreset: addPreset, selectPreset: selectPreset, selectedPreset: selectedPreset }),
        react_1.default.createElement(Feed_1.default, { selectedPreset: selectedPreset, presets: presets, addTopicToPreset: addTopicToPreset })));
};
exports.default = App;
