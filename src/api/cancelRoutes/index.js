const forEach = require('lodash/forEach');
const isEmpty = require('lodash/isEmpty');

module.exports = {
  cancelAllTasks: (taskList) => (req, res) => {
    for (var i = 0; i < taskList.length; i++) {
      for (var j = 0; j < taskList[i].length; j++) {
        if (!isEmpty(taskList[i][j])) {
          taskList[i][j].destroy();
        }
      }
    }
    res.json({
      success: true,
      taskList,
    })
  }
}
