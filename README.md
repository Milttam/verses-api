# Verses-API

Verses-API is a simple web service that allows users to fetch bible verses using
query parameters of a book, chapter, and verse of the 1995 NASB translation.
The project is implemented using Python, Express.js, and MySQL.

### TODO/Future Progress

- [x] Inject Verses into MySQL
- [x] Create simple GET route and DB connection
- [x] Add feature: Rate Limiting
- [x] Clean up request to use query instead of path params (https://apidog.com/articles/http-request-parameters-guide/)
- [x] Add feature: API keys (instead of OAuth)
      (https://blog.logrocket.com/understanding-api-key-authentication-node-js/)
      (https://blog.dreamfactory.com/how-to-secure-rest-apis-api-keys-vs-oauth/)
- [x] Add feature: Passages by chapter
- [x] Fix Bug: verses in database are inaccurate due to "--" bug
- [ ] HTTPS instead of HTTP
- [ ] Get request By Book
- [ ] Refactor Rate limiting to handle by key (https://kinsta.com/knowledgebase/api-rate-limit/#:~:text=One%20of%20the%20ways%20to,requests%20are%20throttled%20or%20denied.)
- [ ] Deploy MySQL database (https://www.youtube.com/watch?v=lwOsI8LtVEQ, https://www.youtube.com/watch?v=uEVmD6n8Il0)
- [ ] Deploy vanilla API (https://codedamn.com/news/application-programming-interface/host-your-api)
- [ ] Create Proxy Server (handle caching, rate limiting, and hide api keys) (https://konghq.com/learning-center/api-management/what-is-an-api-proxy)
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
