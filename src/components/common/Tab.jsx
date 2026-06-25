// Tab component for tabbed navigation
export default function Tab({ tabData, field, setField }) {
  return (
    <div className="flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max border border-richblack-700 shadow-lg">
      {
        tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`${
              field === tab.type
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-transparent text-richblack-200 hover:text-richblack-100"
            } py-2 px-6 rounded-full transition-all duration-300 font-medium text-sm hover:scale-105`}
          >
            {tab?.tabName}
          </button>
        ))}
    </div>
  );
}