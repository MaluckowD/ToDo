import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import s1 from "./KirillLoh.module.css";
import s from "../Modals.module.css";
import Kirillloh from "../../../images/Кирилл2.jpg";
import useStore from "../../../store/useToDoStore.js";
var KirillLoh = React.memo(function (_a) {
    var modalRef = _a.modalRef;
    var closeModal = useStore(function (state) { return state.closeModal; });
    return (_jsx("div", { className: [s.modal, s1.Kirillloh].join(" "), ref: modalRef, children: _jsxs("div", { className: [s.modalcontent, s1.modalcontent].join(" "), children: [_jsx("img", { className: s.modalcontent_image, src: Kirillloh, alt: "\u041A\u0438\u0440\u0438\u043B\u043B" }), _jsx("p", { style: { color: "#000" }, children: "\u041A\u0418\u0420\u0418\u041B\u041B \u041B\u041E\u0425" }), _jsx("button", { className: s.close, onClick: closeModal, children: "\u0412\u044B\u0439\u0442\u0438" })] }) }));
}, function (prevProps, nextProps) { return prevProps.modalRef === nextProps.modalRef; });
export default KirillLoh;
//# sourceMappingURL=KirillLoh.js.map