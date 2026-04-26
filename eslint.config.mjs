import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
    ...nextCoreWebVitals,
    {
        rules: {
            "react-hooks/set-state-in-effect": "off",
            "react-hooks/static-components": "off",
        },
    },
];

export default config;