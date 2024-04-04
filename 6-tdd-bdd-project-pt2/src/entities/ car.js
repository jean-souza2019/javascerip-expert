const Base = require("./base/base");

class Car extends Base {
  constructor({ id, name, releaseYear, available, gasAvailable }) {
    super({ id, name })

    this.releaseYear = this.releaseYear
    this.available = this.available
    this.gasAvailable = this.gasAvailable
  }
}

module.exports = Car