/* global passGuardManager */
// var testX = '5303f8f472ec5ae6f291f62c32187ca1f82c85ae6d98c6f7ba3f26967aed0a6a'
var testX = 'E81B4E4FECE753A48AB8E5A1396A391C909A0F9127418A5D41A2150FB1D885A4'
// var testY = 'c4dbf52d591c67ef06d3ed48c49b2eab5c119e56f925752570a5fe5ff9ef5155'
var testY = '1A65213A5379BEC31E63E9116D7789CB3C21020DAFF311FF47101FC573E3CB87'
var releaseX = 'f2650fa164a13f97a13490259582f94954aae523371f51f61b25e05ae2323903'
var releaseY = '94d34c440dee78553719bca97f517a75f3d243bf771da59702b1b3642398c2ae'
var isTest = ['http://60.10.20.25:9111', 'http://47.95.225.175:9083', 'http://127.0.0.1:9083'].indexOf(location.origin) > -1
var ecckey = isTest ? `${testX}|${testY}` : `${releaseX}|${releaseY}`
function showKeyBoard (id) {
  if (!passGuardManager.hasPassGuard(id)) {
    passGuardManager.newPassGuard(id)
    passGuardManager.setCipherKey(id, window.skey)
    passGuardManager.setEccKey(id, ecckey)
    passGuardManager.EditTextAlwaysShow(id, false)
    passGuardManager.setWebViewSyn(id, true)
    passGuardManager.setMaxLength(id, 20)
    passGuardManager.initPassGuardKeyBoard(id)
  }
  passGuardManager.StartPassGuardKeyBoard(id)
}

function doHideAction (id) {
  document.getElementById(id).value = passGuardManager.getText(id)
}
function doShowAction (id) {
  document.getElementById(id).value = passGuardManager.getText(id)
}
function addText (id, text) {
  document.getElementById(id).value = text
}
function closeKeyBoard (id) {
  passGuardManager.StopPassGuardKeyBoard(id)
}

window.doHideAction = doHideAction
window.doShowAction = doShowAction
window.addText = addText
window.showKeyBoard = showKeyBoard
window.closeKeyBoard = closeKeyBoard
