export class NotFound extends Error {
  constructor(message = 'Not Found') {
    super(message)
    this.status = 404
  }
}
export class Forbidden extends Error {
  constructor(message = 'Access Forbidden') {
    super(message)
    this.status = 403
  }
}
export class UnAuthorized extends Error {
  constructor(...params) {
    super(...params)
    this.status = 401
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnAuthorized)
    }
  }
}
export class BadRequest extends Error {
  constructor(...params) {
    super(...params)
    this.status = 400
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequest)
    }
  }
}
export class NotAcceptable extends Error {
  constructor(message = 'Not Acceptable') {
    super(message)
    this.status = 406
  }
}
export class Unexpected extends Error {
  constructor(message = 'Unexpected Error') {
    super(message)
    this.status = 500
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Unexpected)
    }
  }
}
