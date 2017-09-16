'use strict';

var forEach = require('lodash/forEach');
var isEmpty = require('lodash/isEmpty');

module.exports = {
  cancelAllTasks: function cancelAllTasks(taskList) {
    return function (req, res) {
      for (var i = 0; i < taskList.length; i++) {
        for (var j = 0; j < taskList[i].length; j++) {
          if (!isEmpty(taskList[i][j])) {
            taskList[i][j].destroy();
          }
        }
      }
      res.json({
        success: true,
        taskList: taskList
      });
    };
  }
};
//# sourceMappingURL=index.js.map