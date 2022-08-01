const Catapults = artifacts.require('Catapults')

module.exports = function (deployer) {
  deployer.deploy(Catapults)
}
