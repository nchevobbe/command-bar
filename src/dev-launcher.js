import {init} from './index';

const cmdBar = init(
  document.getElementById('app'),
  {
    getCommands: function() {
      return [{
      title: "Direct command",
      code: "DIRECT",
      description: "Command that execute a command",
      handler: (data, history) => log("DIREK", {data, history})
    }, {
      title: "Parent sync command",
      code: "PARENT_SYNC...",
      description: "Command that returns sub-commands synchronously",
      getSubCommands: function (data, history) {
        return [{
          title: "1-A",
          code: "1-A",
          handler: (data, history) => log("A", {data, history})
        }, {
          title: "1-B",
          code: "1-B",
          getSubCommands: function() {
            return [{
              title: "2-A",
              getSubCommands: () => [{
                title: "3-A",
                handler: (data, history) => log("3-A", {data, history})
              }]
            }]
          }
        }, {
      title: "Item 1",
      group: "ITEM",
      description: "My first item",
      code: "ITEM_1"
    }, {
      title: "Item 2",
      group: "ITEM",
      description: "My second item",
      code: "ITEM_2"
    }, {
      title: "Item 3",
      group: "ITEM",
      description: "My third item",
      code: "ITEM_3"
    }, {
      title: "Use items",
      forGroup: "ITEM",
      getSubCommands: async function (data, history) {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));

        return [{
          title: "display items",
          handler: (data, history) => log("display items", {data, history})
        }];
      }
    }];
      }
    }, {
      title: "Parent async command",
      code: "PARENT_ASYNC...",
      description: "Command that returns sub-commands asynchronously",
      getSubCommands: async function (data, history) {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));

        return [{
          title: "direk A",
          code: "DIREK_A",
          handler: (data, history) => log("AS/A", {data, history})
        }, {
          title: "AS/B...",
          code: "AS/B",
          getSubCommands: async function (data, history) {
            await new Promise((resolve) => setTimeout(() => resolve(), 2000));

            return [{
              title: "AS A",
              handler: () => log("AS/B/A", {data, history})
            }, {
              title: "AS B",
              handler: () => log("AS/B/B", {data, history})
            }];
          }
        }];
      }
    }, {
      title: "Item 1",
      group: "ITEM",
      description: "My first item",
      code: "ITEM_1",
      className: "item"
    }, {
      title: "Item 2",
      group: "ITEM",
      description: "My second item",
      code: "ITEM_2",
      className: "item"
    }, {
      title: "Item 3",
      group: "ITEM",
      description: "My third item",
      code: "ITEM_3",
      className: "item"
    }, {
      title: "Use items",
      forGroup: "ITEM",
      getSubCommands: async function (data, history) {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));

        return [{
          title: "display items",
          handler: (data, history) => log("display items", {data, history})
        }];
      }
    }];
    }
  }
);

let keylog = "";
document.addEventListener("keypress", e => {
  keylog = (keylog + e.key).substr(-2);
  if (keylog === "gg") {
    keylog = "";
    cmdBar.prompt("Do it",[{
      title: "Yes",
      handler: (...args) => log(...args)
    }, {
      title: "No",
      handler: (...args) => log(...args)
    }, {
      title: "Cancel",
      handler: (...args) => log(...args)
    }]);
  }
});

function log(...args) {
  console.log(...args);
}