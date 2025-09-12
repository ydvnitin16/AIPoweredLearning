import React from 'react';

const Button = ({
    type,
    name,
    onClick,
    className,
    color,
    bgColor,
    borderPx,
    borderColor,
    borderRadius,
    width,
    height
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={(`w-full bg-[#0F172A] py-2 rounded-full font-semibold cursor-pointer ${className}`)}
            style={{
                backgroundColor: bgColor,
                color: color,
                borderWidth: borderPx,
                borderColor: borderColor,
                borderRadius: borderRadius,
                width: width,
                height: height,
            }}
        >
            {name}
        </button>
    );
};

export default Button;
