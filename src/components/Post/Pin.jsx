import React from 'react'

const Pin = () => {
    return (
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-45">
            <defs>
                <radialGradient id="HeadShine" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 30) scale(40 40)">
                    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
                    <stop offset="60%" stop-color="#C00000" stop-opacity="1" />
                    <stop offset="100%" stop-color="#800000" stop-opacity="1" />
                </radialGradient>
            </defs>

            <path
                d="M 50 82 L 47 98 L 50 100 L 53 98 Z"
                fill="#CCCCCC"
                stroke="#000000"
                stroke-width="0.5"
                stroke-linejoin="round"
            />
            <path
                d="M 50 82 L 46 98 L 50 100 L 54 98 Z"
                fill="#FFFFFF"
                stroke="#000000"
                stroke-width="0.5"
                stroke-linejoin="round"
            />

            <ellipse
                cx="50"
                cy="68"
                rx="18"
                ry="10"
                fill="#C00000"
                stroke="#000000"
                stroke-width="1.5"
            />

            <circle
                cx="50"
                cy="38"
                r="25"
                fill="#CC0000"
                stroke="#000000"
                stroke-width="1.5"
            />

            <circle
                cx="50"
                cy="38"
                r="25"
                fill="url(#HeadShine)"
            />

            <path
                d="M 68 68 C 65 72, 55 74, 50 74 C 45 74, 35 72, 32 68 C 30 65, 30 61, 32 58 C 34 60, 48 62, 50 62 C 52 62, 66 60, 68 58 C 70 61, 70 65, 68 68 Z"
                fill="white"
                fill-opacity="0.3"
            />

            <ellipse
                cx="38"
                cy="25"
                rx="5"
                ry="3"
                fill="white"
                fill-opacity="0.7"
            />

        </svg>
    )
}

export default Pin