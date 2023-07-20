export default {
	200: {
		name: "OK",
		description: "The request has succeeded. The information returned with the response is dependent on the method used in the request."
	},
  400: {
	name: "BadRequest",
	description: "The server could not understand the request due to invalid syntax."
  },
  401: {
	name: "Unauthorized",
	description: "The request requires user authentication."
  },
  402: {
	name: "PaymentRequired",
	description: "This code is reserved for future use."
  },
  403: {
	name: "Forbidden",
	description: "The server understood the request, but is refusing to fulfill it."
  },
  404: {
	name: "NotFound",
	description: "The server has not found anything matching the Request-URI."
  },
  405: {
	name: "MethodNotAllowed",
	description: "The method specified in the Request-Line is not allowed for the resource identified by the Request-URI."
  },
  406: {
	name: "NotAcceptable",
	description: "The server has found a resource matching the request but not one that satisfies the accept headers."
  },
  407: {
	name: "ProxyAuthenticationRequired",
	description: "The client must first authenticate itself with the proxy."
  },
  408: {
	name: "RequestTimeout",
	description: "The server waited for the request, but the client did not finish the request within the time the server was prepared to wait."
  },
  409: {
	name: "Conflict",
	description: "The request could not be completed due to a conflict with the current state of the resource."
  },
  410: {
	name: "Gone",
	description: "The requested resource is no longer available at the server and no forwarding address is known."
  },
  411: {
	name: "LengthRequired",
	description: "The server refuses to accept the request without a defined Content-Length."
  },
  412: {
	name: "PreconditionFailed",
	description: "The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server."
  },
  413: {
	name: "PayloadTooLarge",
	description: "The server is refusing to process a request because the request entity is larger than the server is willing or able to process."
  },
  414: {
	name: "URITooLong",
	description: "The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret."
  },
  415: {
	name: "UnsupportedMediaType",
	description: "The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method."
  },
  416: {
	name: "RangeNotSatisfiable",
	description: "None of the range-specifier values in the Range request-header field overlap the current extent of the selected resource."
  },
  417: {
	name: "ExpectationFailed",
	description: "The expectation given in an Expect request-header field could not be met by this server."
  },
  418: {
	name: "ImATeapot",
	description: "Any attempt to brew coffee with a teapot should result in the error code 418 I'm a teapot."
  },
  421: {
	name: "MisdirectedRequest",
	description: "The request was directed at a server that is not able to produce a response."
  },
  422: {
	name: "UnprocessableEntity",
	description: "The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions."
  },
  423: {
	name: "Locked",
	description: "The source or destination resource of a method is locked."
  },
  424: {
	name: "FailedDependency",
	description: "The method could not be performed on the resource because the requested action depended on another action and that action failed."
  },
  426: {
	name: "UpgradeRequired",
	description: "The client should switch to a different protocol."
  },
  428: {
	name: "PreconditionRequired",
	description: "The origin server requires the request to be conditional."
  },
  429: {
	name: "TooManyRequests",
	description: "The user has sent too many requests in a given amount of time."
  },
  431: {
	name: "RequestHeaderFieldsTooLarge",
	description: "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large."
  },
  451: {
	name: "UnavailableForLegalReasons",
	description: "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource."
  },
  500: {
	name: "InternalServerError",
	description: "The server encountered an unexpected condition which prevented it from fulfilling the request."
  },
  501: {
	name: "NotImplemented",
	description: "The server does not support the functionality required to fulfill the request."
  },
  502: {
	name: "BadGateway",
	description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request."
  },
  503: {
	name: "ServiceUnavailable",
	description: "The server is currently unable to handle the request due to a temporary overloading or maintenance of the server."
  },
  504: {
	name: "GatewayTimeout",
	description: "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI."
  },
  505: {
	name: "HTTPVersionNotSupported",
	description: "The server does not support, or refuses to support, the HTTP protocol version that was used in the request message."
  },
  506: {
	name: "VariantAlsoNegotiates",
	description: "Transparent content negotiation for the request results in a circular reference."
  },
  507: {
	name: "InsufficientStorage",
	description: "The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request."
  },
  508: {
	name: "LoopDetected",
	description: "The server detected an infinite loop while processing a request with Depth: infinity."
  },
  510: {
	name: "NotExtended",
	description: "Further extensions to the request are required for the server to fulfill it."
  },
  511: {
	name: "NetworkAuthenticationRequired",
	description: "The client needs to authenticate to gain network access."
  }
};
