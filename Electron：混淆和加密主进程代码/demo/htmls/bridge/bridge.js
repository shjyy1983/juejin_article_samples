/*
 * @Author: SHEN
 * @Date: 2020-10-12 09:29:19
 * @Last Modified by: SHEN
 * @Last Modified time: 2020-10-12 11:17:32
 */
const { ipcRenderer } = require('electron')
const { app } = require('electron').remote

function getAppVersion() {
  return app.getVersion();
}

function ipcCall(channel, type, datas) {
  let result = ipcRenderer.sendSync(channel, { type, datas })
  return result
}

export {
  getAppVersion,
  ipcCall
}