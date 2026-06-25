// IconBtn component for customizable buttons with icons
export default function IconBtn({ text, onclick, children, disabled, outline = false, customClasses, type, }) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center justify-center outline-none ${outline ? "border border-richblack-300 bg-transparent" : "bg-richblack-700"
                } gap-x-2 rounded-md py-2 px-5 font-semibold text-white hover:bg-richblack-600 hover:text-white duration-300 ${customClasses}
                ${disabled && 'cursor-not-allowed hover:bg-richblack-800 hover:text-gray-300'} `}
            type={type}
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-yellow-50"}`}>{text}</span>
                        {children}
                    </>
                ) :
                    (text)
            }
        </button>
    )
}