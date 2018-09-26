NODEJS

### HTTP API

No npm(s) only core

This is what it does:

- parses requests
- parses methods
- parses query strings
- parses headers
- parses payload
- routes requests
- returns json
- handles staging/prod env differently
- http and https server
- ping route

### To run

either use:
`NODE_ENV=staging node index.js`

or

`NODE_ENV=production node index.js`

Both an HTTP & HTTPS server will run regardless of environment.

`/hello` route will return a simple json object.
