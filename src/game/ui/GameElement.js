const DisplayElement = require('../../lib/ui/DisplayElement')

const MainMenu =  require('./MainMenu')
const Home =      require('./Home')

module.exports = class GameElement extends DisplayElement {
  // The game's main element control class. It also handles all interaction
  // for per-user things.

  constructor(game) {
    super()

    this.game = game
    this.user = null

    this.mainMenu = new MainMenu(this.game)
    this.addChild(this.mainMenu)

    this.home = new Home()
    this.home.visible = false
    this.addChild(this.home)

    this.initEventListeners()
  }

  initEventListeners() {
    this.mainMenu.on('loggedin', user => this.loggedInAs(user))
    this.home.on('saverequested', () => this.saveRequested())
  }

  fixLayout() {
    this.w = this.parent.contentW
    this.h = this.parent.contentH
  }

  run() {
    // Call this after adding it to the root.

    this.root.select(this.mainMenu)
  }

  loggedInAs(user) {
    // Called in MainMenu when the user logs in.

    this.user = user

    this.mainMenu.visible = false
    this.home.visible = true
    this.root.select(this.home)

    this.home.loadUser(user)
  }

  saveRequested() {
    // Called in Home when the combo ^S is pressed.

    this.user.kingdomBuildings = Array.from(
      this.home.kingdomBuildings)
    this.user.saveAll()
  }
}