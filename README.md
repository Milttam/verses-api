# Verses-API

Verses-API is a simple web service that allows users to fetch bible verses using
query parameters of book, chapter, and verse.
The project is implemented using Python, Express.js, and MySQL.

### TODO/Future Progress

- [x] Inject Verses into MySQL
- [x] Create simple GET route and DB connection
- [x] Add feature: Rate Limiting
- [x] Clean up request to use query instead of path params (https://apidog.com/articles/http-request-parameters-guide/)
- [x] Add feature: API keys (instead of OAuth)
      (https://blog.logrocket.com/understanding-api-key-authentication-node-js/)
      (https://blog.dreamfactory.com/how-to-secure-rest-apis-api-keys-vs-oauth/)
- [ ] Create Proxy Server (handle caching, rate limiting, and hide api keys) (https://konghq.com/learning-center/api-management/what-is-an-api-proxy)
- [ ] Deploy MySQL database (https://www.youtube.com/watch?v=lwOsI8LtVEQ, https://www.youtube.com/watch?v=uEVmD6n8Il0)
- [ ] Deploy vanilla API (https://codedamn.com/news/application-programming-interface/host-your-api)
- [ ] Deploy Proxy Server
- [ ] Refactor Vanilla API to handle passages, chapters, versions, and Refactor DB structure to allow for tables for each book/version, etc

### Example Request:

```
http://localhost:3333/api/v1/verse?book=John&chapter=3&verse=16
```

### Example Response:

```
{
  "book": "John",
  "chapter": 3,
  "verse": 16,
  "text": "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."
}
```
