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
const topics_1 = __importDefault(require("./topics"));
const FeedSection = ({ presets, addPreset, selectPreset, selectedPreset }) => {
    var _a;
    const [newPreset, setNewPreset] = (0, react_1.useState)('');
    const handleAddPreset = () => {
        if (newPreset.trim() !== '') {
            addPreset(newPreset.trim());
            setNewPreset('');
        }
    };
    const getTopicSlug = (id) => {
        const topic = topics_1.default.find((topic) => topic.id === id);
        return topic ? topic.slug : id;
    };
    return (react_1.default.createElement("div", { className: "feed-section" },
        react_1.default.createElement("h2", null, "Instagram"),
        react_1.default.createElement("div", { className: "preset-dropdown" },
            react_1.default.createElement("select", { id: "preset-select", onChange: (e) => selectPreset(e.target.value) }, presets.map((preset, index) => (react_1.default.createElement("option", { key: index, value: preset.name }, preset.name))))),
        react_1.default.createElement("div", { className: "new-preset" },
            react_1.default.createElement("input", { type: "text", value: newPreset, onChange: (e) => setNewPreset(e.target.value), placeholder: "New preset name" }),
            react_1.default.createElement("button", { onClick: handleAddPreset }, "Add")),
        react_1.default.createElement("div", { className: "preset-list" }, (_a = presets.find((preset) => preset.name === selectedPreset)) === null || _a === void 0 ? void 0 : _a.topics.map((topic, idx) => (react_1.default.createElement("li", { key: idx, className: "topic-item" }, getTopicSlug(topic)))))));
};
exports.default = FeedSection;
