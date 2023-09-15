// App.jsx

export const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto text-center">
      <h1 className="mt-4 max-w-lg text-3xl font-semibold leading-loose text-gray-900 mx-auto">
        Schedule your work and breaks!
      </h1>
      <div className="w-full px-2 m-auto md:w-2/5">
        <form className="my-10" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Enter time period (in minutes):
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label>Enter break time duration (in minutes):</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              value={breakTimeDuration}
              onChange={(e) => setBreakTimeDuration(e.target.value)}
            />
          </div>

          <button
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            type="submit"
          >
            Set Schedule
          </button>
        </form>      
      </div>
    </div>
  )
}
