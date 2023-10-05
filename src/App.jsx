import { useState, useEffect } from "react";
import { useChannel } from "ably/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bellImage from './assets/bell.png';

export const App = () => {
  const [breakTimeDuration, setBreakTimeDuration] = useState(0);
  const [workTimeDuration, setWorkTimeDuration] = useState(0);
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  const { channel } = useChannel("activities", (matchedActivity) => {
    setActivity(matchedActivity);
  });

  const { channel: messagesChannel } = useChannel("messages", (message) => {
  setMessage(message)
  });
  
  function handleMessageSubmit(e) {
    e.preventDefault();
    messagesChannel.publish("message", {
      name: userName,
      message: message,
    });
    setMessage("");
    setUserName("");
  };

  function handleSubmit(e) {
      e.preventDefault();
  fetch("http://127.0.0.1:3001/sendbreaktime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          duration: breakTimeDuration,
        }),
      })
        .then((response) => {
          response.json();
        })
        .catch((error) => {
          console.error("Error sending break time data:", error);
        });
  }

  function handleActivityNotification() {
    setTimeout(
      () => {
        if(“Notification” in Window && Notification.permission === "granted") {
            let notification = new Notification(`${activity.data.name}`, 
            {
              body: `After all the ${workTimeDuration} minutes of hardwork, your body deserves a ${activity.data.duration} minutes ${activity.data.name}`,
              icon: bellImage,
              	})
          }
        else {
          toast.success(
            `After all the ${workTimeDuration} minutes of hardwork, your body deserves a ${activity.data.duration} minutes ${activity.data.name}`,
            {
              position: "top-right",
              autoClose: 3000,
            },
          );
        }
      },
      workTime * 60 * 1000,
    );
  }

  useEffect(() => {
    if (activity && workTimeDuration > 0) {
      handleActivityNotification();
    }
  }, [activity, workTimeDuration]);

  const CustomToast = ({ sender, message }) => (
    <div>
      <strong>{sender}:</strong> {message}
    </div>
  );

  const { channel: messagesChannel} = useChannel("messages", (message) => {
    toast(
      <CustomToast sender={message.data.name} message={message.data.message} />,
      {
        position: "top-right",
        autoClose: 3000,
      },
    );
  });

  function showSystemNotification() {
    if (“Notification” in window) {
      if (Notification.permission === "granted") {
        let notification = new Notification("Need your attention", {
          body: "This site uses notifications for the best user experience. Thank you for understanding",
          icon: bellImage,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            let notification = new Notification("Need your attention", {
              body: "This site uses notifications for the best user experience. Thank you for understanding",
              icon: bellImage,
            });
          } else if (permission === "denied") {
            alert(
              "This site uses notifications for the best user experience. Thank you for understanding",
            );
          }
        });
      } else {
        alert(
          "This site uses notifications for the best user experience. Thank you for understanding",
        );
      }
    } else {
      alert(
        "This site uses notifications for the best user experience. Thank you for understanding",
      );
    }
  }
  
  useEffect(() => showSystemNotification(), []);

  return (
    <div className="max-w-screen-xl mx-auto text-center">
      <h1 className="mt-4 max-w-lg text-3xl font-semibold leading-loose text-gray-900 mx-auto">
        Schedule your work and breaks!
      </h1>
      <div className="w-full px-2 m-auto md:w-2/5">
        <form className="my-10" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Enter work time duration (in minutes):
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              value={workTimeDuration}
              onChange={(e) => setWorkTimeDuration(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Enter break time duration (in minutes):
            </label>
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
        <form className="my-10" onSubmit={handleMessageSubmit}>
          <p className="tracking-tighter text-gray-500 md:text-lg mb-2">
            Wanna share your goals with others?
          </p>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Message
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}


export default App;
