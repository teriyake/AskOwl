import { createBot } from "botui";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BotUI, BotUIAction, BotUIMessageList } from "@botui/react";

import "@botui/react/dist/styles/default.theme.scss";

const mybot = createBot();

const App = () => {
  useEffect(() => {
    mybot.message
      .add({ text: "Hi!" })
      .then(() => mybot.wait({ waitTime: 1000 }))
      .then(() => mybot.message.add({ text: "How can I help you?" }))
      .then(() => mybot.wait({ waitTime: 500 }))
      .then(() =>
        mybot.action.set(
          {
            options: [
              { label: "Blue Bus", value: "bus" },
              { label: "Menu", value: "menu" },
            ],
          },
          { actionType: "selectButtons" },
        ),
      )
      .then((data) => mybot.wait({ waitTime: 500 }, data))
      .then((data) => {
        if (data?.selected?.value == "menu") {
          mybot.message.add({
            text: "This functionality is currently unavailable:( We apologize for the inconvenience.",
          });
        } else {
          mybot.message
            .add({ text: "Where to?" })
            .then(() => mybot.wait({ waitTime: 500 }))
            .then(() =>
              mybot.action.set(
                {
                  options: [
                    { label: "Bryn Mawr", value: "bmc" },
                    { label: "Haverford", value: "hc" },
                  ],
                },
                { actionType: "selectButtons" },
              ),
            )
            .then((data) => mybot.wait({ waitTime: 500 }, data))
            .then((data) => {
              if (data?.selected?.value == "bmc") {
                console.log("bmc");
              } else {
                console.log("hc");
              }
              mybot.message
                .add({ text: "Now or later?" })
                .then(() => mybot.wait({ waitTime: 500 }))
                .then(() =>
                  mybot.action.set(
                    {
                      options: [
                        { label: "Now", value: "now" },
                        { label: "Later", value: "later" },
                      ],
                    },
                    { actionType: "selectButtons" },
                  ),
                )
                .then((data) => mybot.wait({ waitTime: 500 }, data))
                .then((data) => {
                  if (data?.selected?.value == "now") {
                    mybot.message.add({ text: "..." });
                    var date = new Date();
                    var n = date.toDateString();
                    var time = date.toLocaleTimeString();
                    console.log("date:", n);
                    console.log("time:", time);
                  } else {
                    mybot.message
                      .add({ text: "Day of the week?" })
                      .then(() => mybot.wait({ waitTime: 500 }))
                      .then(() =>
                        mybot.action.set(
                          {
                            options: [
                              { label: "Mon", value: "mon" },
                              { label: "Tue", value: "tue" },
                              { label: "Wed", value: "wed" },
                              { label: "Thur", value: "thur" },
                              { label: "Fri", value: "fri" },
                              { label: "Sat", value: "sat" },
                              { label: "Sun", value: "sun" },
                            ],
                          },
                          { actionType: "selectButtons" },
                        ),
                      )
                      .then((data) => mybot.wait({ waitTime: 500 }, data))
                      .then((data) => {
                        mybot.message
                          .add({ text: "Please enter the time:" })
                          .then(() => mybot.wait({ waitTime: 500 }))
                          .then(() =>
                            mybot.action.set(
                              { placeholder: "HH:MM" },
                              { actionType: "input" },
                            ),
                          );
                      });
                  }
                });
            });
        }
      });
  }, []);

  return (
    <div>
      <BotUI bot={mybot} >
        <BotUIMessageList />
        <BotUIAction />
      </BotUI>
    </div>
  );
};

const containerElement = document.getElementById("botui");
if (containerElement) {
  const root = createRoot(containerElement);
  root.render(<App />);
}
