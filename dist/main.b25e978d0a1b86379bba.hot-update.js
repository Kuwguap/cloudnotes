"use strict";
self["webpackHotUpdatetsx_project"]("main",{

/***/ "./src/pages/Notes.tsx":
/*!*****************************!*\
  !*** ./src/pages/Notes.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tiptap_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @tiptap/react */ "./node_modules/@tiptap/react/dist/index.js");
/* harmony import */ var _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tiptap/starter-kit */ "./node_modules/@tiptap/starter-kit/dist/index.js");
/* harmony import */ var _tiptap_extension_placeholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tiptap/extension-placeholder */ "./node_modules/@tiptap/extension-placeholder/dist/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CloudIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserCircleIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PlusIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/LockClosedIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/Bars3Icon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/MagnifyingGlassIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/MoonIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/SunIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ChartBarIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArrowLeftOnRectangleIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/DocumentTextIcon.js");
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @heroicons/react/24/solid */ "./node_modules/@heroicons/react/24/solid/esm/StarIcon.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/development/chunk-D52XG6IA.mjs");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
/* harmony import */ var _components_FolderTree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/FolderTree */ "./src/components/FolderTree.tsx");
/* harmony import */ var _components_FolderModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/FolderModal */ "./src/components/FolderModal.tsx");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_LockModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/LockModal */ "./src/components/LockModal.tsx");
/* harmony import */ var _components_ShareModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/ShareModal */ "./src/components/ShareModal.tsx");
/* harmony import */ var _components_AdminDashboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/AdminDashboard */ "./src/components/AdminDashboard.tsx");
/* harmony import */ var _CloudView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CloudView */ "./src/pages/CloudView.tsx");
/* harmony import */ var _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tiptap/extension-image */ "./node_modules/@tiptap/extension-image/dist/index.js");
/* harmony import */ var _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tiptap/extension-link */ "./node_modules/@tiptap/extension-link/dist/index.js");
/* harmony import */ var _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @tiptap/extension-text-align */ "./node_modules/@tiptap/extension-text-align/dist/index.js");
/* harmony import */ var _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @tiptap/extension-underline */ "./node_modules/@tiptap/extension-underline/dist/index.js");
/* harmony import */ var _tiptap_extension_code_block__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @tiptap/extension-code-block */ "./node_modules/@tiptap/extension-code-block/dist/index.js");
/* harmony import */ var _tiptap_extension_color__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @tiptap/extension-color */ "./node_modules/@tiptap/extension-color/dist/index.js");
/* harmony import */ var _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @tiptap/extension-text-style */ "./node_modules/@tiptap/extension-text-style/dist/index.js");
/* harmony import */ var _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @tiptap/extension-highlight */ "./node_modules/@tiptap/extension-highlight/dist/index.js");
/* harmony import */ var _tiptap_extension_typography__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @tiptap/extension-typography */ "./node_modules/@tiptap/extension-typography/dist/index.js");
/* harmony import */ var _tiptap_extension_task_list__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @tiptap/extension-task-list */ "./node_modules/@tiptap/extension-task-list/dist/index.js");
/* harmony import */ var _tiptap_extension_task_item__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @tiptap/extension-task-item */ "./node_modules/@tiptap/extension-task-item/dist/index.js");
/* harmony import */ var _tiptap_extension_table__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @tiptap/extension-table */ "./node_modules/@tiptap/extension-table/dist/index.js");
/* harmony import */ var _tiptap_extension_table_row__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @tiptap/extension-table-row */ "./node_modules/@tiptap/extension-table-row/dist/index.js");
/* harmony import */ var _tiptap_extension_table_cell__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @tiptap/extension-table-cell */ "./node_modules/@tiptap/extension-table-cell/dist/index.js");
/* harmony import */ var _tiptap_extension_table_header__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @tiptap/extension-table-header */ "./node_modules/@tiptap/extension-table-header/dist/index.js");
/* harmony import */ var _tiptap_extension_youtube__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @tiptap/extension-youtube */ "./node_modules/@tiptap/extension-youtube/dist/index.js");
/* harmony import */ var _tiptap_extension_font_family__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @tiptap/extension-font-family */ "./node_modules/@tiptap/extension-font-family/dist/index.js");
/* harmony import */ var _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @tiptap/extension-subscript */ "./node_modules/@tiptap/extension-subscript/dist/index.js");
/* harmony import */ var _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @tiptap/extension-superscript */ "./node_modules/@tiptap/extension-superscript/dist/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};







































var CATEGORIES = [
    { id: '1', name: 'Personal', color: 'bg-blue-500' },
    { id: '2', name: 'Work', color: 'bg-green-500' },
    { id: '3', name: 'Ideas', color: 'bg-purple-500' },
    { id: '4', name: 'Tasks', color: 'bg-yellow-500' },
];
var stripHtmlTags = function (html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
};
// Add ErrorBoundary component
var EditorErrorBoundary = /** @class */ (function (_super) {
    __extends(EditorErrorBoundary, _super);
    function EditorErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    EditorErrorBoundary.getDerivedStateFromError = function () {
        return { hasError: true };
    };
    EditorErrorBoundary.prototype.componentDidCatch = function (error) {
        console.error('Editor error:', error);
    };
    EditorErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "p-4 text-red-500", children: "Something went wrong with the editor. Please refresh the page." }));
        }
        return this.props.children;
    };
    return EditorErrorBoundary;
}((react__WEBPACK_IMPORTED_MODULE_1___default().Component)));
// Add image compression function
var compressImage = function (file_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([file_1], args_1, true), Promise, function (file, maxWidth, maxHeight, quality) {
        if (maxWidth === void 0) { maxWidth = 800; }
        if (maxHeight === void 0) { maxHeight = 800; }
        if (quality === void 0) { quality = 0.5; }
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        var _a;
                        var img = new Image();
                        img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                        img.onload = function () {
                            var canvas = document.createElement('canvas');
                            var width = img.width;
                            var height = img.height;
                            // Calculate new dimensions while maintaining aspect ratio
                            if (width > height) {
                                if (width > maxWidth) {
                                    height = Math.round((height * maxWidth) / width);
                                    width = maxWidth;
                                }
                            }
                            else {
                                if (height > maxHeight) {
                                    width = Math.round((width * maxHeight) / height);
                                    height = maxHeight;
                                }
                            }
                            // Further reduce dimensions if the image is still large
                            var MAX_PIXELS = 400000; // e.g., 632x632
                            if (width * height > MAX_PIXELS) {
                                var scale = Math.sqrt(MAX_PIXELS / (width * height));
                                width = Math.round(width * scale);
                                height = Math.round(height * scale);
                            }
                            canvas.width = width;
                            canvas.height = height;
                            var ctx = canvas.getContext('2d');
                            if (!ctx) {
                                reject(new Error('Could not get canvas context'));
                                return;
                            }
                            // Use better image smoothing
                            ctx.imageSmoothingEnabled = true;
                            ctx.imageSmoothingQuality = 'high';
                            // Draw image with white background to handle transparency
                            ctx.fillStyle = '#FFFFFF';
                            ctx.fillRect(0, 0, width, height);
                            ctx.drawImage(img, 0, 0, width, height);
                            // Convert to JPEG with quality setting
                            var compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                            // If still too large, reduce quality until it's under 100KB
                            var currentQuality = quality;
                            while (compressedDataUrl.length > 100 * 1024 && currentQuality > 0.1) {
                                currentQuality *= 0.8;
                                compressedDataUrl = canvas.toDataURL('image/jpeg', currentQuality);
                            }
                            resolve(compressedDataUrl);
                        };
                        img.onerror = function () {
                            reject(new Error('Failed to load image'));
                        };
                    };
                    reader.onerror = function () {
                        reject(new Error('Failed to read file'));
                    };
                })];
        });
    });
};
var Notes = function () {
    var _a;
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true), sidebarOpen = _b[0], setSidebarOpen = _b[1];
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), selectedNote = _c[0], setSelectedNote = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), notes = _d[0], setNotes = _d[1];
    var _e = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''), searchQuery = _e[0], setSearchQuery = _e[1];
    var _f = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), selectedCategory = _f[0], setSelectedCategory = _f[1];
    var _g = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), showTagInput = _g[0], setShowTagInput = _g[1];
    var _h = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''), newTag = _h[0], setNewTag = _h[1];
    var _j = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all'), viewMode = _j[0], setViewMode = _j[1];
    var _k = (0,react_use__WEBPACK_IMPORTED_MODULE_31__["default"])('theme', 'light'), theme = _k[0], setTheme = _k[1];
    var _l = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), showSettings = _l[0], setShowSettings = _l[1];
    var width = (0,react_use__WEBPACK_IMPORTED_MODULE_32__["default"])().width;
    var isMobile = width < 768;
    var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_33__.useNavigate)();
    var _m = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), user = _m[0], setUser = _m[1];
    var _o = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true), loading = _o[0], setLoading = _o[1];
    var _p = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), error = _p[0], setError = _p[1];
    var _q = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isCollaborating = _q[0], setIsCollaborating = _q[1];
    var _r = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}), activeCollaborators = _r[0], setActiveCollaborators = _r[1];
    var _s = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), folders = _s[0], setFolders = _s[1];
    var _t = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), selectedFolderId = _t[0], setSelectedFolderId = _t[1];
    var _u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), folderModalOpen = _u[0], setFolderModalOpen = _u[1];
    var _v = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), editingFolder = _v[0], setEditingFolder = _v[1];
    var _w = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        isOpen: false,
        folderId: null,
        folderName: '',
    }), folderDeleteConfirmation = _w[0], setFolderDeleteConfirmation = _w[1];
    var _x = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        isOpen: false,
        noteId: null,
        noteTitle: '',
    }), deleteConfirmation = _x[0], setDeleteConfirmation = _x[1];
    var _y = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        isOpen: false,
        mode: 'lock',
        type: 'note',
        id: null,
        title: '',
    }), lockModal = _y[0], setLockModal = _y[1];
    var _z = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), selectedLockedNote = _z[0], setSelectedLockedNote = _z[1];
    var _0 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), deleteLoading = _0[0], setDeleteLoading = _0[1];
    var _1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        isOpen: false,
        noteId: null,
        noteTitle: '',
    }), shareModal = _1[0], setShareModal = _1[1];
    var _2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all'), viewFilter = _2[0], setViewFilter = _2[1];
    var _3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), showAdminDashboard = _3[0], setShowAdminDashboard = _3[1];
    var _4 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true), isComponentMounted = _4[0], setIsComponentMounted = _4[1];
    var _5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), hasError = _5[0], setHasError = _5[1];
    var _6 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isEditorReady = _6[0], setIsEditorReady = _6[1];
    var _7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), showCloudView = _7[0], setShowCloudView = _7[1];
    var editorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    var _8 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), socket = _8[0], setSocket = _8[1];
    // Initialize socket connection
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        var initSocket = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newSocket_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.connectSocket)()];
                    case 1:
                        newSocket_1 = _a.sent();
                        setSocket(newSocket_1);
                        return [2 /*return*/, function () {
                                if (newSocket_1) {
                                    newSocket_1.disconnect();
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Failed to connect socket:', err_1);
                        setError('Failed to establish real-time connection');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        initSocket();
    }, []);
    // Join note session when note is selected
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (socket && selectedNote) {
            socket.emit('join_note', selectedNote.id);
        }
    }, [socket, selectedNote]);
    // Update note content handler
    var handleNoteUpdate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(lodash_debounce__WEBPACK_IMPORTED_MODULE_7___default()(function (noteId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var editor, noteToUpdate, response_1, err_2;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    editor = editorRef.current;
                    if (!editor || editor.isDestroyed)
                        return [2 /*return*/];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    noteToUpdate = notes.find(function (note) { return note.id === noteId; });
                    if (!noteToUpdate)
                        return [2 /*return*/];
                    if (noteToUpdate.isLocked) {
                        console.log('Preventing update of locked note:', noteId);
                        setError('Cannot edit a locked note');
                        editor.commands.setContent(noteToUpdate.content || '');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.updateNote)(noteId, data)];
                case 2:
                    response_1 = _e.sent();
                    console.log('Note updated successfully:', response_1.data.id);
                    // Update notes list with updated note
                    setNotes(function (prevNotes) {
                        return prevNotes.map(function (note) {
                            return note.id === noteId ? response_1.data : note;
                        });
                    });
                    // Update selected note if it's the one being edited
                    if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === noteId) {
                        setSelectedNote(response_1.data);
                    }
                    // Only send real-time updates if content doesn't contain images
                    if (socket && !((_a = data.content) === null || _a === void 0 ? void 0 : _a.includes('data:image'))) {
                        socket.emit('note_change', {
                            noteId: noteId,
                            data: __assign(__assign({}, data), { 
                                // Strip out any image data from real-time updates
                                content: (_b = data.content) === null || _b === void 0 ? void 0 : _b.replace(/<img[^>]+>/g, '[image]') })
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _e.sent();
                    console.error('Error updating note:', err_2);
                    setError(((_d = (_c = err_2.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) || 'Failed to update note');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, 500), [notes, selectedNote, socket]);
    // Handle image upload
    var handleImageUpload = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var editor, compressedImage, updatedContent_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    editor = editorRef.current;
                    if (!selectedNote || !editor || editor.isDestroyed || !isEditorReady)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    if (!file.type.startsWith('image/')) {
                        throw new Error('Please select an image file');
                    }
                    setLoading(true);
                    return [4 /*yield*/, compressImage(file)];
                case 2:
                    compressedImage = _a.sent();
                    // Check final size
                    if (compressedImage.length > 100 * 1024) {
                        throw new Error('Image is too large. Please use a smaller image.');
                    }
                    // Insert image using insertContent
                    editor.commands.insertContent({
                        type: 'image',
                        attrs: {
                            src: compressedImage,
                            alt: file.name.split('.')[0],
                        }
                    });
                    // Wait for next tick to ensure content is updated
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
                case 3:
                    // Wait for next tick to ensure content is updated
                    _a.sent();
                    updatedContent_1 = editor.getHTML();
                    // Save directly without real-time updates for image content
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.updateNote)(selectedNote.id, {
                            content: updatedContent_1,
                            updatedAt: new Date()
                        })];
                case 4:
                    // Save directly without real-time updates for image content
                    _a.sent();
                    // Update local state
                    setNotes(function (prevNotes) {
                        return prevNotes.map(function (note) {
                            return note.id === selectedNote.id
                                ? __assign(__assign({}, note), { content: updatedContent_1, updatedAt: new Date() }) : note;
                        });
                    });
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error uploading image:', error_1);
                    setError(typeof error_1 === 'string' ? error_1 : 'Failed to upload image');
                    return [3 /*break*/, 7];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [selectedNote, isEditorReady, notes]);
    // Update editor configuration
    var editor = (0,_tiptap_react__WEBPACK_IMPORTED_MODULE_34__.useEditor)({
        extensions: [
            _tiptap_starter_kit__WEBPACK_IMPORTED_MODULE_2__["default"].configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
                dropcursor: false,
            }),
            _tiptap_extension_placeholder__WEBPACK_IMPORTED_MODULE_3__["default"].configure({
                placeholder: function (_a) {
                    var editor = _a.editor;
                    if (selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.isLocked) {
                        return 'This note is locked';
                    }
                    return 'Start writing...';
                },
            }),
            _tiptap_extension_image__WEBPACK_IMPORTED_MODULE_12__.Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto my-4',
                },
            }),
            _tiptap_extension_link__WEBPACK_IMPORTED_MODULE_13__["default"].configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
                },
            }),
            _tiptap_extension_text_align__WEBPACK_IMPORTED_MODULE_14__["default"].configure({
                types: ['heading', 'paragraph'],
            }),
            _tiptap_extension_underline__WEBPACK_IMPORTED_MODULE_15__["default"],
            _tiptap_extension_highlight__WEBPACK_IMPORTED_MODULE_19__["default"].configure({
                multicolor: true,
            }),
            _tiptap_extension_typography__WEBPACK_IMPORTED_MODULE_20__["default"],
            _tiptap_extension_task_list__WEBPACK_IMPORTED_MODULE_21__["default"],
            _tiptap_extension_task_item__WEBPACK_IMPORTED_MODULE_22__["default"].configure({
                nested: true,
            }),
            _tiptap_extension_table__WEBPACK_IMPORTED_MODULE_23__["default"].configure({
                resizable: true,
            }),
            _tiptap_extension_table_row__WEBPACK_IMPORTED_MODULE_24__["default"],
            _tiptap_extension_table_header__WEBPACK_IMPORTED_MODULE_26__["default"],
            _tiptap_extension_table_cell__WEBPACK_IMPORTED_MODULE_25__["default"],
            _tiptap_extension_youtube__WEBPACK_IMPORTED_MODULE_27__["default"].configure({
                width: 640,
                height: 480,
                HTMLAttributes: {
                    class: 'rounded-lg',
                },
            }),
            _tiptap_extension_font_family__WEBPACK_IMPORTED_MODULE_28__.FontFamily.configure({
                types: ['textStyle'],
            }),
            _tiptap_extension_text_style__WEBPACK_IMPORTED_MODULE_18__["default"],
            _tiptap_extension_color__WEBPACK_IMPORTED_MODULE_17__.Color,
            _tiptap_extension_subscript__WEBPACK_IMPORTED_MODULE_29__["default"],
            _tiptap_extension_superscript__WEBPACK_IMPORTED_MODULE_30__["default"],
            _tiptap_extension_code_block__WEBPACK_IMPORTED_MODULE_16__["default"].configure({
                HTMLAttributes: {
                    class: 'rounded-lg bg-green-50 dark:bg-green-900/20 p-4 font-mono text-sm my-4 text-green-800 dark:text-green-200',
                },
            }),
        ],
        editable: !(selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.isLocked),
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px]',
            },
            handleDrop: function (view, event, slice, moved) {
                var _a;
                if (!moved && ((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files.length)) {
                    var file = event.dataTransfer.files[0];
                    if (file.type.startsWith('image/')) {
                        event.preventDefault();
                        handleImageUpload(file);
                        return true;
                    }
                }
                return false;
            },
            handlePaste: function (view, event) {
                var _a;
                var items = Array.from(((_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.items) || []);
                var imageItem = items.find(function (item) { return item.type.startsWith('image/'); });
                if (imageItem) {
                    event.preventDefault();
                    var file = imageItem.getAsFile();
                    if (file) {
                        handleImageUpload(file);
                        return true;
                    }
                }
                return false;
            },
        },
        onCreate: function (_a) {
            var editor = _a.editor;
            editorRef.current = editor;
            setIsEditorReady(true);
        },
        onDestroy: function () {
            editorRef.current = null;
            setIsEditorReady(false);
        },
        content: (selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.content) || '',
    });
    // Update content when note changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (editor && selectedNote && !editor.isDestroyed) {
            editor.commands.setContent(selectedNote.content || '');
        }
    }, [selectedNote, editor]);
    // Add editor content update handler
    var handleEditorUpdate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (_a) {
        var editor = _a.editor;
        if (!selectedNote || !isEditorReady || loading || !editor || editor.isDestroyed)
            return;
        if (selectedNote.isLocked) {
            editor.commands.setContent(selectedNote.content || '');
            return;
        }
        var content = editor.getHTML();
        handleNoteUpdate(selectedNote.id, {
            content: content,
            updatedAt: new Date(),
        });
    }, [selectedNote, isEditorReady, loading, handleNoteUpdate]);
    // Update editor event handlers
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (editor && !editor.isDestroyed) {
            editor.on('update', handleEditorUpdate);
            return function () {
                editor.off('update', handleEditorUpdate);
            };
        }
    }, [editor, handleEditorUpdate]);
    // Add editor cleanup effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        return function () {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);
    // Update sanitizeLockedNote helper
    var sanitizeLockedNote = function (note) {
        if (note.isLocked) {
            return __assign(__assign({}, note), { content: '', description: '', tags: [], category: '', color: '' });
        }
        return note;
    };
    // Update handleNoteSelect to handle locked notes
    var handleNoteSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (note) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (loading || !isEditorReady)
                return [2 /*return*/];
            try {
                // Clear editor content before any state changes
                if (editor && !editor.isDestroyed) {
                    editor.commands.clearContent();
                }
                // If note is locked, show unlock modal
                if (note.isLocked) {
                    setSelectedLockedNote(note);
                    setLockModal({
                        isOpen: true,
                        mode: 'unlock',
                        type: 'note',
                        id: note.id,
                        title: note.title,
                    });
                    return [2 /*return*/];
                }
                // Save the selected note ID to localStorage
                localStorage.setItem('lastSelectedNoteId', note.id);
                setSelectedNote(note);
                // Set editor content and editable state
                requestAnimationFrame(function () {
                    if (editor && !editor.isDestroyed && isEditorReady) {
                        editor.commands.setContent(note.content || '');
                        editor.setEditable(!note.isLocked);
                    }
                });
                // Join note session if user is authenticated
                if (user === null || user === void 0 ? void 0 : user.id) {
                    (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.joinNoteSession)(note.id, user.id);
                    setIsCollaborating(true);
                }
            }
            catch (error) {
                console.error('Error selecting note:', error);
                setError('Failed to select note');
            }
            return [2 /*return*/];
        });
    }); }, [editor, loading, isEditorReady, user === null || user === void 0 ? void 0 : user.id]);
    // Update handleLockNote to handle unlocking
    var handleLockNote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (passcode) { return __awaiter(void 0, void 0, void 0, function () {
        var response_2, response_3, err_3;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!lockModal.id)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    setLoading(true);
                    console.log('Processing lock operation:', lockModal.mode, 'for note:', lockModal.id);
                    if (!(lockModal.mode === 'lock')) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.lockNote)(lockModal.id, passcode)];
                case 2:
                    response_2 = _c.sent();
                    console.log('Note locked successfully:', response_2.data);
                    // Update notes list with locked note
                    setNotes(function (prevNotes) { return prevNotes.map(function (note) {
                        return note.id === lockModal.id ? sanitizeLockedNote(response_2.data) : note;
                    }); });
                    // Clear editor and deselect note if it was locked
                    if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === lockModal.id) {
                        setSelectedNote(null);
                        if (editor && !editor.isDestroyed) {
                            editor.commands.setContent('');
                            editor.setEditable(false);
                        }
                        localStorage.removeItem('lastSelectedNoteId');
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.unlockNote)(lockModal.id, passcode)];
                case 4:
                    response_3 = _c.sent();
                    console.log('Note unlocked successfully:', response_3.data);
                    // Update notes list with unlocked note
                    setNotes(function (prevNotes) { return prevNotes.map(function (note) {
                        return note.id === lockModal.id ? response_3.data : note;
                    }); });
                    // Update selected note and editor content
                    setSelectedNote(response_3.data);
                    if (editor && !editor.isDestroyed) {
                        editor.commands.setContent(response_3.data.content || '');
                        editor.setEditable(true);
                    }
                    _c.label = 5;
                case 5:
                    // Reset lock modal state
                    setLockModal({ isOpen: false, mode: 'lock', type: 'note', id: null, title: '' });
                    setSelectedLockedNote(null);
                    setError(null);
                    return [3 /*break*/, 8];
                case 6:
                    err_3 = _c.sent();
                    console.error('Lock operation failed:', err_3);
                    setError(((_b = (_a = err_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to process lock operation');
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); }, [lockModal.id, lockModal.mode, selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id, editor]);
    // Update filtered notes computation
    var filteredNotes = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
        var filtered = notes.map(function (note) { return sanitizeLockedNote(note); });
        // Filter by folder
        if (selectedFolderId) {
            filtered = filtered.filter(function (note) { return note.folderId === selectedFolderId; });
        }
        else {
            filtered = filtered.filter(function (note) { return !note.folderId; });
        }
        // Filter by view type
        switch (viewFilter) {
            case 'owned':
                filtered = filtered.filter(function (note) { return note.authorId === (user === null || user === void 0 ? void 0 : user.id); });
                break;
            case 'shared':
                filtered = filtered.filter(function (note) { return note.authorId !== (user === null || user === void 0 ? void 0 : user.id); });
                break;
            // 'all' shows everything
        }
        // Filter by search query
        if (searchQuery) {
            var query_1 = searchQuery.toLowerCase();
            filtered = filtered.filter(function (note) {
                var _a;
                return note.title.toLowerCase().includes(query_1) ||
                    (!note.isLocked && ((_a = note.content) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query_1)));
            });
        }
        return filtered;
    }, [notes, selectedFolderId, viewFilter, searchQuery, user === null || user === void 0 ? void 0 : user.id]);
    var handleFolderEdit = function (folder) {
        setEditingFolder(folder);
        setFolderModalOpen(true);
    };
    var handleFolderDelete = function (folderId, folderName) {
        setFolderDeleteConfirmation({
            isOpen: true,
            folderId: folderId,
            folderName: folderName,
        });
    };
    var handleFolderSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (folderId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, response, err_4;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (loading || !isEditorReady)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    // Clear editor content before changing folder
                    if (editor && !editor.isDestroyed) {
                        editor.commands.clearContent();
                    }
                    setSelectedFolderId(folderId);
                    setSelectedNote(null);
                    if (!folderId) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getNotes)({ folderId: folderId })];
                case 2:
                    response = _c.sent();
                    setNotes(response.data);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getNotes)()];
                case 4:
                    response = _c.sent();
                    setNotes(response.data);
                    _c.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_4 = _c.sent();
                    console.error('Error selecting folder:', err_4);
                    setError(((_b = (_a = err_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to load notes for folder');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [loading, isEditorReady, editor]);
    // Add note action handlers
    var handleShareNote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!shareModal.noteId)
                        return [2 /*return*/];
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.shareNote)(shareModal.noteId, data)];
                case 1:
                    _a.sent();
                    setShareModal({ isOpen: false, noteId: null, noteTitle: '' });
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    console.error('Error sharing note:', err_5);
                    throw err_5;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [shareModal.noteId]);
    var handleShareClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (note) {
        setShareModal({
            isOpen: true,
            noteId: note.id,
            noteTitle: note.title || 'Untitled'
        });
    }, []);
    var handleDeleteNote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (note) {
        setDeleteConfirmation({
            isOpen: true,
            noteId: note.id,
            noteTitle: note.title,
        });
    }, []);
    var showLockNoteModal = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (note) {
        setLockModal({
            isOpen: true,
            mode: note.isLocked ? 'unlock' : 'lock',
            type: 'note',
            id: note.id,
            title: note.title,
        });
    }, []);
    var handleStarNote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (note) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handleNoteUpdate(note.id, { starred: !note.starred })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error starring note:', error_2);
                    setError('Failed to star note');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [handleNoteUpdate]);
    var handleConfirmDelete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_6;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!deleteConfirmation.noteId)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    setDeleteLoading(true);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.deleteNote)(deleteConfirmation.noteId)];
                case 2:
                    _c.sent();
                    setNotes(function (prevNotes) {
                        return prevNotes.filter(function (note) { return note.id !== deleteConfirmation.noteId; });
                    });
                    if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === deleteConfirmation.noteId) {
                        setSelectedNote(null);
                        if (editor && !editor.isDestroyed) {
                            editor.commands.clearContent();
                        }
                    }
                    setDeleteConfirmation({
                        isOpen: false,
                        noteId: null,
                        noteTitle: '',
                    });
                    return [3 /*break*/, 5];
                case 3:
                    err_6 = _c.sent();
                    console.error('Error deleting note:', err_6);
                    setError(((_b = (_a = err_6.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to delete note');
                    return [3 /*break*/, 5];
                case 4:
                    setDeleteLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [deleteConfirmation.noteId, selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id, editor]);
    var handleConfirmShare = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (permissions) { return __awaiter(void 0, void 0, void 0, function () {
        var err_7;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!shareModal.noteId)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.shareNote)(shareModal.noteId, permissions)];
                case 2:
                    _c.sent();
                    setShareModal({
                        isOpen: false,
                        noteId: null,
                        noteTitle: '',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _c.sent();
                    console.error('Error sharing note:', err_7);
                    setError(((_b = (_a = err_7.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to share note');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [shareModal.noteId]);
    var handleConfirmLock = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (passcode) { return __awaiter(void 0, void 0, void 0, function () {
        var err_8;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!lockModal.id)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    if (!(lockModal.mode === 'lock')) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleNoteUpdate(lockModal.id, {
                            isLocked: true,
                            passcode: passcode,
                        })];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!selectedLockedNote) return [3 /*break*/, 5];
                    return [4 /*yield*/, handleNoteUpdate(lockModal.id, {
                            isLocked: false,
                            passcode: null,
                        })];
                case 4:
                    _c.sent();
                    setSelectedNote(selectedLockedNote);
                    _c.label = 5;
                case 5:
                    setLockModal({
                        isOpen: false,
                        mode: 'lock',
                        type: 'note',
                        id: null,
                        title: '',
                    });
                    setSelectedLockedNote(null);
                    return [3 /*break*/, 7];
                case 6:
                    err_8 = _c.sent();
                    console.error('Error locking/unlocking note:', err_8);
                    setError(((_b = (_a = err_8.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to lock/unlock note');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [lockModal.id, lockModal.mode, selectedLockedNote, handleNoteUpdate]);
    var handleSignOut = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth');
    };
    // Join note session when a note is selected
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) && (user === null || user === void 0 ? void 0 : user.id)) {
            (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.joinNoteSession)(selectedNote.id, user.id);
        }
    }, [selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id, user === null || user === void 0 ? void 0 : user.id]);
    var createNewNote = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response_4, err_9;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.createNote)({
                            title: 'Untitled Note',
                            content: '',
                            description: '',
                            category: selectedCategory || undefined,
                            tags: [],
                            folderId: selectedFolderId || undefined,
                            isLocked: false,
                            isArchived: false,
                            isPinned: false,
                            starred: false
                        })];
                case 1:
                    response_4 = _c.sent();
                    console.log('Created note:', response_4.data);
                    setNotes(function (prevNotes) { return __spreadArray([response_4.data], prevNotes, true); });
                    setSelectedNote(response_4.data);
                    // Set editor content after a small delay to ensure it's ready
                    setTimeout(function () {
                        editor === null || editor === void 0 ? void 0 : editor.commands.setContent('');
                        editor === null || editor === void 0 ? void 0 : editor.commands.focus();
                    }, 100);
                    return [3 /*break*/, 3];
                case 2:
                    err_9 = _c.sent();
                    console.error('Error creating note:', err_9);
                    setError(((_b = (_a = err_9.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to create note');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var confirmDelete = function (note) {
        setDeleteConfirmation({
            isOpen: true,
            noteId: note.id,
            noteTitle: note.title,
        });
    };
    var toggleStar = function (noteId) { return __awaiter(void 0, void 0, void 0, function () {
        var noteToUpdate, response_5, err_10;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    noteToUpdate = notes.find(function (note) { return note.id === noteId; });
                    if (!noteToUpdate)
                        return [2 /*return*/];
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.updateNote)(noteId, {
                            starred: !noteToUpdate.starred
                        })];
                case 1:
                    response_5 = _c.sent();
                    setNotes(function (prevNotes) {
                        return prevNotes.map(function (note) {
                            return note.id === noteId ? response_5.data : note;
                        });
                    });
                    if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === noteId) {
                        setSelectedNote(response_5.data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_10 = _c.sent();
                    setError(((_b = (_a = err_10.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to update note');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var addTag = function (noteId, tag) { return __awaiter(void 0, void 0, void 0, function () {
        var noteToUpdate, updatedTags, response_6, err_11;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!tag.trim())
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    noteToUpdate = notes.find(function (note) { return note.id === noteId; });
                    if (!noteToUpdate)
                        return [2 /*return*/];
                    updatedTags = __spreadArray(__spreadArray([], noteToUpdate.tags, true), [tag], false);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.updateNote)(noteId, {
                            tags: updatedTags,
                            updatedAt: new Date()
                        })];
                case 2:
                    response_6 = _c.sent();
                    setNotes(function (prevNotes) { return prevNotes.map(function (note) {
                        return note.id === noteId ? response_6.data : note;
                    }); });
                    if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === noteId) {
                        setSelectedNote(response_6.data);
                    }
                    setNewTag('');
                    setShowTagInput(false);
                    return [3 /*break*/, 4];
                case 3:
                    err_11 = _c.sent();
                    setError(((_b = (_a = err_11.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to add tag');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var removeTag = function (noteId, tagToRemove) { return __awaiter(void 0, void 0, void 0, function () {
        var noteToUpdate, updatedTags, response_7, err_12;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    noteToUpdate = notes.find(function (note) { return note.id === noteId; });
                    if (!noteToUpdate)
                        return [2 /*return*/];
                    updatedTags = noteToUpdate.tags.filter(function (tag) { return tag !== tagToRemove; });
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.updateNote)(noteId, {
                            tags: updatedTags,
                            updatedAt: new Date()
                        })];
                case 1:
                    response_7 = _c.sent();
                    setNotes(function (prevNotes) { return prevNotes.map(function (note) {
                        return note.id === noteId ? response_7.data : note;
                    }); });
                    if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === noteId) {
                        setSelectedNote(response_7.data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_12 = _c.sent();
                    setError(((_b = (_a = err_12.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to remove tag');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Update editor content effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (!editor || !selectedNote || loading || !isEditorReady)
            return;
        var content = selectedNote.content || '';
        if (content !== editor.getHTML()) {
            var timeoutId_1 = setTimeout(function () {
                if (editor && !editor.isDestroyed && isEditorReady) {
                    editor.commands.setContent(content);
                }
            }, 0);
            return function () { return clearTimeout(timeoutId_1); };
        }
    }, [selectedNote, editor, loading, isEditorReady]);
    // Update cleanup effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        return function () {
            if (editor && !editor.isDestroyed) {
                setIsEditorReady(false);
                editor.destroy();
            }
        };
    }, [editor]);
    // Add folder fetching effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        var fetchFolders = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, err_13;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getFolders)()];
                    case 1:
                        response = _d.sent();
                        setFolders(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_13 = _d.sent();
                        setError(((_b = (_a = err_13.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to fetch folders');
                        if (((_c = err_13.response) === null || _c === void 0 ? void 0 : _c.status) === 401) {
                            navigate('/auth');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchFolders();
    }, [navigate]);
    // Update filtered notes effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (!editor || filteredNotes.length === 0 || loading || !isEditorReady)
            return;
        // If no note is selected but we have filtered notes
        if (!selectedNote && filteredNotes.length > 0) {
            var firstNote_1 = filteredNotes[0];
            // Don't auto-select locked notes that user doesn't own
            if (firstNote_1.isLocked && firstNote_1.authorId !== (user === null || user === void 0 ? void 0 : user.id)) {
                return;
            }
            setSelectedNote(firstNote_1);
            requestAnimationFrame(function () {
                if (editor && !editor.isDestroyed && isEditorReady) {
                    editor.commands.setContent(firstNote_1.content || '');
                }
            });
        }
    }, [filteredNotes, selectedNote, editor, loading, isEditorReady, user === null || user === void 0 ? void 0 : user.id]);
    var handleCreateFolder = function (parentId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // If called directly from FolderTree, open the modal with parentId
            setEditingFolder(null);
            setFolderModalOpen(true);
            return [2 /*return*/];
        });
    }); };
    var handleSubmitFolder = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var folderData, response, foldersResponse, err_14;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    if (!data.name || !data.name.trim()) {
                        setError('Folder name is required');
                        return [2 /*return*/];
                    }
                    folderData = {
                        name: data.name.trim(),
                        description: (_a = data.description) === null || _a === void 0 ? void 0 : _a.trim(),
                        parentId: data.parentId || undefined
                    };
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.createFolder)(folderData)];
                case 1:
                    response = _d.sent();
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getFolders)()];
                case 2:
                    foldersResponse = _d.sent();
                    setFolders(foldersResponse.data);
                    setFolderModalOpen(false);
                    setEditingFolder(null);
                    setError(null);
                    return [3 /*break*/, 4];
                case 3:
                    err_14 = _d.sent();
                    console.error('Error creating folder:', err_14);
                    setError(((_c = (_b = err_14.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || 'Failed to create folder');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEditFolder = function (folder) {
        setEditingFolder(folder);
        setFolderModalOpen(true);
    };
    var handleDeleteFolder = function (folderId) { return __awaiter(void 0, void 0, void 0, function () {
        var err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.deleteFolder)(folderId)];
                case 1:
                    _a.sent();
                    setFolders(function (prevFolders) { return prevFolders.filter(function (folder) { return folder.id !== folderId; }); });
                    if (selectedFolderId === folderId) {
                        setSelectedFolderId(null);
                    }
                    setFolderDeleteConfirmation({
                        isOpen: false,
                        folderId: null,
                        folderName: ''
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_15 = _a.sent();
                    console.error('Error deleting folder:', err_15);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleLockFolder = function (passcode) { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_16;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!lockModal.id)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, , 8]);
                    if (!(lockModal.mode === 'lock')) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.lockFolder)(lockModal.id, passcode)];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.unlockFolder)(lockModal.id, passcode)];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getFolders)()];
                case 6:
                    response = _c.sent();
                    setFolders(response.data);
                    setLockModal({
                        isOpen: false,
                        mode: 'lock',
                        type: 'note',
                        id: null,
                        title: ''
                    });
                    return [3 /*break*/, 8];
                case 7:
                    err_16 = _c.sent();
                    console.error('Error processing folder lock:', err_16);
                    setError(((_b = (_a = err_16.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to process lock operation');
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleShare = function (noteId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Sharing note:', noteId, 'with:', data);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.shareNote)(noteId, data)];
                case 2:
                    _a.sent();
                    console.log('Share successful');
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getNotes)()];
                case 3:
                    response = _a.sent();
                    setNotes(response.data);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error sharing note:', error_3);
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleUpdatePermissions = function (userId, canEdit) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!shareModal.noteId)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.updateSharePermissions)(shareModal.noteId, userId, canEdit)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getNotes)()];
                case 3:
                    response = _a.sent();
                    setNotes(response.data);
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error updating permissions:', error_4);
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Theme effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    // Add error recovery function
    var handleError = function () {
        setHasError(false);
        setSelectedNote(null);
        setSelectedFolderId(null);
        if (editor) {
            editor.commands.clearContent();
        }
    };
    var handleConfirmFolderDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_17;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!folderDeleteConfirmation.folderId)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.deleteFolder)(folderDeleteConfirmation.folderId)];
                case 2:
                    _c.sent();
                    setFolders(function (prevFolders) { return prevFolders.filter(function (folder) { return folder.id !== folderDeleteConfirmation.folderId; }); });
                    if (selectedFolderId === folderDeleteConfirmation.folderId) {
                        setSelectedFolderId(null);
                    }
                    setFolderDeleteConfirmation({
                        isOpen: false,
                        folderId: null,
                        folderName: ''
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_17 = _c.sent();
                    console.error('Error deleting folder:', err_17);
                    setError(((_b = (_a = err_17.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Failed to delete folder');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Update cleanup when note is deselected
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (!selectedNote) {
            localStorage.removeItem('lastSelectedNoteId');
        }
    }, [selectedNote]);
    // Add initialization effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        var isSubscribed = true;
        var initializeData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, userData, parsedUser, _a, notesResponse, foldersResponse, error_5, err_18;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        setLoading(true);
                        token = localStorage.getItem('token');
                        userData = localStorage.getItem('user');
                        if (!token || !userData) {
                            console.log('No auth tokens found, redirecting to login');
                            navigate('/auth');
                            return [2 /*return*/];
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        parsedUser = JSON.parse(userData);
                        if (!parsedUser.id || !parsedUser.name || !parsedUser.email) {
                            throw new Error('Invalid user data');
                        }
                        if (!isSubscribed) return [3 /*break*/, 3];
                        setUser(parsedUser);
                        return [4 /*yield*/, Promise.all([
                                (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getNotes)(),
                                (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.getFolders)()
                            ])];
                    case 2:
                        _a = _d.sent(), notesResponse = _a[0], foldersResponse = _a[1];
                        if (isSubscribed) {
                            setNotes(notesResponse.data);
                            setFolders(foldersResponse.data);
                            setLoading(false);
                        }
                        _d.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_5 = _d.sent();
                        console.error('Error initializing:', error_5);
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        navigate('/auth');
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_18 = _d.sent();
                        console.error('Error:', err_18);
                        if (isSubscribed) {
                            setError(((_c = (_b = err_18.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || 'Failed to initialize');
                            setLoading(false);
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        initializeData();
        return function () {
            isSubscribed = false;
        };
    }, [navigate]);
    // Add socket connection effect
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return;
        var socket = (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.connectSocket)();
        if (socket) {
            socket.on('error', function (error) {
                console.error('Socket error:', error);
            });
            socket.on('note:update', function (updatedNote) {
                setNotes(function (prevNotes) {
                    return prevNotes.map(function (note) {
                        return note.id === updatedNote.id ? updatedNote : note;
                    });
                });
                if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === updatedNote.id) {
                    setSelectedNote(updatedNote);
                    if (editor && !editor.isDestroyed) {
                        editor.commands.setContent(updatedNote.content || '');
                        editor.setEditable(!updatedNote.isLocked);
                    }
                }
            });
            socket.on('note:delete', function (deletedNoteId) {
                setNotes(function (prevNotes) { return prevNotes.filter(function (note) { return note.id !== deletedNoteId; }); });
                if ((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === deletedNoteId) {
                    setSelectedNote(null);
                    if (editor && !editor.isDestroyed) {
                        editor.commands.setContent('');
                        editor.setEditable(true);
                    }
                }
            });
        }
        return function () {
            if (socket) {
                socket.off('error');
                socket.off('note:update');
                socket.off('note:delete');
                (0,_services_api__WEBPACK_IMPORTED_MODULE_4__.disconnectSocket)();
            }
        };
    }, [user === null || user === void 0 ? void 0 : user.id, selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id, editor]);
    // Update the loading screen render
    if (loading) {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "flex items-center justify-center min-h-screen bg-white dark:bg-gray-900", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "text-center", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "Loading your notes..." })] }) }));
    }
    if (error) {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "flex items-center justify-center min-h-screen bg-white dark:bg-gray-900", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "text-center", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { className: "text-red-500 mb-4", children: error }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () {
                            setError(null);
                            window.location.reload();
                        }, className: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700", children: "Retry" })] }) }));
    }
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "h-screen bg-white dark:bg-gray-900", children: [showCloudView ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CloudView__WEBPACK_IMPORTED_MODULE_11__["default"], { notes: filteredNotes, onBack: function () { return setShowCloudView(false); } })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "".concat(sidebarOpen ? 'w-64' : 'w-0', " transition-all duration-300 ease-in-out overflow-hidden border-r border-gray-200 dark:border-gray-700"), children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex items-center", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_35__["default"], { className: "h-6 w-6 text-purple-600" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { className: "ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent", children: "CloudNotes" })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex items-center gap-3", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_36__["default"], { className: "h-8 w-8 text-gray-600 dark:text-gray-300" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { className: "font-medium text-gray-900 dark:text-white", children: user === null || user === void 0 ? void 0 : user.name }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: user === null || user === void 0 ? void 0 : user.email })] })] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "flex items-center justify-between mb-4", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Views" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "space-y-2", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return setViewFilter('all'); }, className: "w-full text-left px-3 py-2 rounded-lg ".concat(viewFilter === 'all'
                                                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'), children: "All Notes" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return setViewFilter('owned'); }, className: "w-full text-left px-3 py-2 rounded-lg ".concat(viewFilter === 'owned'
                                                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'), children: "My Notes" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return setViewFilter('shared'); }, className: "w-full text-left px-3 py-2 rounded-lg ".concat(viewFilter === 'shared'
                                                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'), children: "Shared with Me" })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_FolderTree__WEBPACK_IMPORTED_MODULE_5__["default"], { folders: folders, selectedFolderId: selectedFolderId, onFolderSelect: handleFolderSelect, onCreateFolder: handleCreateFolder, onEditFolder: handleEditFolder, onDeleteFolder: handleFolderDelete }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "p-4 flex-1 overflow-y-auto", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Notes" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: createNewNote, className: "p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_37__["default"], { className: "h-4 w-4 text-gray-600 dark:text-gray-300" }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "space-y-2", children: filteredNotes.map(function (note) { return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return handleNoteSelect(note); }, className: "w-full text-left p-3 rounded-lg transition-colors ".concat((selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.id) === note.id
                                                ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'), children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex items-center justify-between", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex-1 min-w-0", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", { className: "text-sm font-medium truncate text-gray-900 dark:text-white", children: note.title || 'Untitled Note' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: note.isLocked ? '🔒 This note is locked' : stripHtmlTags(note.content || '') })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex items-center gap-1 ml-2", children: [note.isLocked && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_38__["default"], { className: "h-3.5 w-3.5 text-purple-500" })), note.starred && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_39__["default"], { className: "h-3.5 w-3.5 text-yellow-500" }))] })] }) }, note.id)); }) })] })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex-1 flex flex-col min-h-screen overflow-hidden", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "flex flex-col px-4 py-3", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex items-center gap-4", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: function () { return setShowCloudView(true); }, className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg", title: "Cloud view", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_35__["default"], { className: "h-5 w-5 text-gray-600 dark:text-gray-300" }) }), !sidebarOpen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: function () { return setSidebarOpen(true); }, className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg", title: "Expand sidebar", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_41__["default"], { className: "h-5 w-5 text-gray-600 dark:text-gray-300" }) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex-1 relative", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { type: "text", placeholder: "Search notes...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_42__["default"], { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: function () { return setTheme(theme === 'light' ? 'dark' : 'light'); }, className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg", title: "Toggle theme", children: theme === 'light' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_43__["default"], { className: "h-5 w-5 text-gray-600" })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_44__["default"], { className: "h-5 w-5 text-gray-300" })) }), (user === null || user === void 0 ? void 0 : user.email) === 'richierodney434@gmail.com' ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: function () { return setShowAdminDashboard(true); }, className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg", title: "Admin Dashboard", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_45__["default"], { className: "h-5 w-5 text-gray-600 dark:text-gray-300" }) })) : null, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: handleSignOut, className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg", title: "Sign out", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_46__["default"], { className: "h-5 w-5 text-gray-600 dark:text-gray-300" }) })] }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "flex-1 overflow-y-auto bg-white dark:bg-gray-900", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "max-w-4xl mx-auto p-6", children: selectedNote ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { type: "text", value: selectedNote.title, onChange: function (e) { return handleNoteUpdate(selectedNote.id, { title: e.target.value }); }, disabled: selectedNote.isLocked, className: "w-full text-3xl font-bold mb-4 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white ".concat(selectedNote.isLocked ? 'opacity-50 cursor-not-allowed' : ''), placeholder: "Note title..." }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "prose dark:prose-invert max-w-none ".concat(selectedNote.isLocked ? 'opacity-50 pointer-events-none' : ''), children: editor && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EditorErrorBoundary, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "relative", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex items-center gap-2 p-2 mb-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-x-auto", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleBold().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('bold') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), title: "Bold (Ctrl+B)", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5Zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8Z" }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleItalic().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('italic') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), title: "Italic (Ctrl+I)", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleUnderline().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('underline') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), title: "Underline (Ctrl+U)", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "w-px h-6 bg-gray-200 dark:bg-gray-700" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", { onChange: function (e) {
                                                                            var level = parseInt(e.target.value);
                                                                            level ? editor.chain().focus().toggleHeading({ level: level }).run() :
                                                                                editor.chain().focus().setParagraph().run();
                                                                        }, value: ((_a = [1, 2, 3].find(function (level) { return editor.isActive('heading', { level: level }); })) === null || _a === void 0 ? void 0 : _a.toString()) || '', className: "p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", { value: "", children: "Normal" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", { value: "1", children: "Heading 1" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", { value: "2", children: "Heading 2" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", { value: "3", children: "Heading 3" })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "w-px h-6 bg-gray-200 dark:bg-gray-700" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleBulletList().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('bulletList') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), title: "Bullet List", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleOrderedList().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('orderedList') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), title: "Numbered List", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zm-2 7h3.5v1H3v-1zm2 3v3h1v1H3v-1h1v-2H3v-1h2zm-2 7h3.5v1H3v-1zm2 3v3h1v1H3v-1h1v-2H3v-1h2zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: "w-px h-6 bg-gray-200 dark:bg-gray-700" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () {
                                                                            if (selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.isLocked)
                                                                                return;
                                                                            var input = document.createElement('input');
                                                                            input.type = 'file';
                                                                            input.accept = 'image/*';
                                                                            input.onchange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                var file;
                                                                                var _a;
                                                                                return __generator(this, function (_b) {
                                                                                    switch (_b.label) {
                                                                                        case 0:
                                                                                            file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                                                                            if (!file) return [3 /*break*/, 2];
                                                                                            return [4 /*yield*/, handleImageUpload(file)];
                                                                                        case 1:
                                                                                            _b.sent();
                                                                                            _b.label = 2;
                                                                                        case 2: return [2 /*return*/];
                                                                                    }
                                                                                });
                                                                            }); };
                                                                            input.click();
                                                                        }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Insert Image", disabled: selectedNote === null || selectedNote === void 0 ? void 0 : selectedNote.isLocked, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleCodeBlock().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('codeBlock') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), title: "Code Block", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M8.5 3.5l-6.8 6.8c-.3.3-.3.7 0 1l6.8 6.8 1.5-1.5L4.3 11l5.7-5.7-1.5-1.8zm7 0l6.8 6.8c.3.3.3.7 0 1l-6.8 6.8-1.5-1.5L19.7 11 14 5.3l1.5-1.8z" }) }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleCode().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('code') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), title: "Inline Code", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" }) }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_tiptap_react__WEBPACK_IMPORTED_MODULE_34__.EditorContent, { editor: editor }), editor.isFocused && !editor.state.selection.empty && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_tiptap_react__WEBPACK_IMPORTED_MODULE_34__.BubbleMenu, { editor: editor, tippyOptions: {
                                                                    duration: 100,
                                                                    placement: 'top',
                                                                    appendTo: function () { return document.body; },
                                                                }, className: "bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex items-center gap-1", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleBold().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('bold') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), children: "B" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleItalic().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('italic') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), children: "I" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return editor.chain().focus().toggleUnderline().run(); }, className: "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(editor.isActive('underline') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''), children: "U" })] }))] }) })) })] })) : ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_47__["default"], { className: "h-12 w-12 mb-4" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { children: "Select a note or create a new one" })] })) }) })] })] })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_LockModal__WEBPACK_IMPORTED_MODULE_8__["default"], { isOpen: lockModal.isOpen, onClose: function () {
                    setLockModal({ isOpen: false, mode: 'lock', type: 'note', id: null, title: '' });
                    setSelectedLockedNote(null);
                }, onSubmit: handleLockNote, title: "".concat(lockModal.mode === 'lock' ? 'Lock' : 'Unlock', " ").concat(lockModal.title), mode: lockModal.mode }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ShareModal__WEBPACK_IMPORTED_MODULE_9__["default"], { isOpen: shareModal.isOpen, onClose: function () { return setShareModal({ isOpen: false, noteId: null, noteTitle: '' }); }, onSubmit: handleShareNote, title: "Share \"".concat(shareModal.noteTitle, "\""), noteId: shareModal.noteId, noteTitle: shareModal.noteTitle }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_48__.AnimatePresence, { children: deleteConfirmation.isOpen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.div, { initial: { scale: 0.95 }, animate: { scale: 1 }, exit: { scale: 0.95 }, className: "bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: "Delete Note" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", { className: "text-gray-500 dark:text-gray-400 mb-4", children: ["Are you sure you want to delete \"", deleteConfirmation.noteTitle, "\"? This action cannot be undone."] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex justify-end gap-3", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return setDeleteConfirmation({ isOpen: false, noteId: null, noteTitle: '' }); }, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg", children: "Cancel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: handleConfirmDelete, className: "px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg", children: deleteLoading ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", { className: "flex items-center gap-2", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Deleting..."] })) : ('Delete Note') })] })] }) })) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_FolderModal__WEBPACK_IMPORTED_MODULE_6__["default"], { isOpen: folderModalOpen, onClose: function () {
                    setFolderModalOpen(false);
                    setEditingFolder(null);
                }, onSubmit: handleSubmitFolder, folders: folders, editingFolder: editingFolder, title: editingFolder ? 'Edit Folder' : 'Create Folder' }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_48__.AnimatePresence, { children: folderDeleteConfirmation.isOpen && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_40__.motion.div, { initial: { scale: 0.95 }, animate: { scale: 1 }, exit: { scale: 0.95 }, className: "bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: "Delete Folder" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", { className: "text-gray-500 dark:text-gray-400 mb-4", children: ["Are you sure you want to delete \"", folderDeleteConfirmation.folderName, "\"? All notes in this folder will be moved to the root level."] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { className: "flex justify-end gap-3", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: function () { return setFolderDeleteConfirmation({ isOpen: false, folderId: null, folderName: '' }); }, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg", children: "Cancel" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { onClick: handleConfirmFolderDelete, className: "px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg", children: "Delete Folder" })] })] }) })) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_AdminDashboard__WEBPACK_IMPORTED_MODULE_10__["default"], { isOpen: showAdminDashboard, onClose: function () { return setShowAdminDashboard(false); } })] }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notes);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8dcb5372c261946536b7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.b25e978d0a1b86379bba.hot-update.js.map