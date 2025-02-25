import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import s from "./Footer.module.css";
import useStore from "../../../store/useToDoStore.js";
var Footer = function () {
    var openModal = useStore(function (state) { return state.openModal; });
    return (_jsx("footer", { className: s.footer, children: _jsxs("div", { className: s.footer_content, children: [_jsx("button", { onClick: openModal, className: s.description, children: "\u041A\u0438\u0440\u0438\u043B\u043B \u043B\u043E\u0445" }), _jsx("div", { className: s.links, children: _jsx("a", { href: "https://t.me/todo_cerber_bot", target: "_blank", rel: "noopener noreferrer", children: "\u041D\u0430\u0448 tg \u0431\u043E\u0442" }) })] }) }));
};
export default Footer;
//# sourceMappingURL=Footer.js.map