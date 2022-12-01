import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const Settings = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    function changePassword() {
        if (newPassword !== verifyPassword) {
            alert('Both new passwords need to be the same');
        }
        else {
            const body = { password, newPassword };
            fetch('/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
                .then((result) => {
                if (result.status === 400)
                    alert('Invalid current password');
                else {
                    setPassword('');
                    setNewPassword('');
                    setVerifyPassword('');
                }
            });
        }
    }
    return (_jsxs("div", { children: [_jsx("p", { "data-testid": "update-pw", children: " UPDATE PASSWORD" }), _jsxs("form", { onSubmit: (e) => e.preventDefault(), children: [_jsx("input", { type: "password", placeholder: 'Current Password', value: password, onChange: input => setPassword(input.target.value) }), _jsx("input", { type: "password", placeholder: 'New Password', value: newPassword, onChange: input => setNewPassword(input.target.value) }), _jsx("input", { type: "password", placeholder: 'New Password', value: verifyPassword, onChange: input => setVerifyPassword(input.target.value) }), _jsx("button", { type: "submit", onClick: () => changePassword(), children: "SUBMIT" })] })] }));
};
export default Settings;
