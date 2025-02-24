import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import s from "./Main.module.css";
import Profile from "./Profile/Profile";
import Calendar from "./Calendar/Calendar";
import { Route, Routes } from "react-router-dom";
var Main = function () {
    return (_jsx("main", { className: s.main, children: _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Calendar, {}) }), _jsx(Route, { path: "settings", element: _jsx(Profile, {}) })] }) }));
};
export default Main;
//# sourceMappingURL=Main.js.map