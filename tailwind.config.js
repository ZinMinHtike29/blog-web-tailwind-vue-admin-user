/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.{html,js}",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                Nunito: "Nunito"
            },
            flex: {
                "md-flex": "0 0 40%",
                "sm-flex": "0 0 50%",
                "exsm-flex": "0 0 90%"
            }
        },
    },
    plugins: [
        require('tw-elements/dist/plugin')
    ]
}