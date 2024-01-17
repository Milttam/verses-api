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
- [ ] Do some initial metrics on performance
- [ ] Fix Bug: optimize verifyKey to not go through all entries
- [ ] HTTPS instead of HTTP (https://www.ibm.com/docs/en/integration-bus/10.0?topic=apis-securing-rest-api-by-using-https)
- [ ] Get Passage for Book
- [ ] Refactor Rate limiting to handle by key (https://kinsta.com/knowledgebase/api-rate-limit/#:~:text=One%20of%20the%20ways%20to,requests%20are%20throttled%20or%20denied.
      https://kinsta.com/knowledgebase/api-rate-limit/#:~:text=One%20of%20the%20ways%20to,requests%20are%20throttled%20or%20denied.)
- [ ] Deploy MySQL database (https://www.youtube.com/watch?v=lwOsI8LtVEQ, https://www.youtube.com/watch?v=uEVmD6n8Il0)
- [ ] Deploy vanilla API (https://codedamn.com/news/application-programming-interface/host-your-api)
- [ ] Create Proxy Server (handle caching, load balancing, rate limiting, and hide api keys) (https://konghq.com/learning-center/api-management/what-is-an-api-proxy)
- [ ] Deploy Proxy Server
- [ ] Refactor Vanilla API to handle passages, chapters, versions, and Refactor DB structure to allow for tables for each book/version, etc

# Example Usage

### Info Request:

```
http://localhost:3000/api/bible/info
```

### Info Response:

```
{
    "result": {
        "number_of_books": 66,
        "book_info": [
            {
                "book_name": "1-chronicles",
                "number_of_chapters": 29
            },
            {
                "book_name": "1-corinthians",
                "number_of_chapters": 16
            },
            {
                "book_name": "1-john",
                "number_of_chapters": 5
            },
            ...
        ]
    }
}
```

### Verse Request:

```
http://localhost:3333/api/bible/find?book=hebrews&chap=1&verse=1
```

### Verse Response:

```
{
    "result": {
        "type": "verse",
        "description": "hebrews 1:1",
        "text": [
            "God, after He spoke long ago to the fathers in the prophets in many portions and in many ways,"
        ]
    }
}
```

### Chapter Request

```
http://localhost:3333/api/bible/find?book=romans&chap=1
```

### Chapter Response

```
{
    "result": {
        "type": "chapter",
        "description": "romans 1",
        "text": [
            "Paul, a bond-servant of Christ Jesus, called as an apostle, set apart for the gospel of God,",
            "which He promised beforehand through His prophets in the holy Scriptures,",
            "concerning His Son, who was born of a descendant of David according to the flesh,",
            "who was declared the Son of God with power by the resurrection from the dead, according to the Spirit of holiness, Jesus Christ our Lord,",
            "through whom we have received grace and apostleship to bring about the obedience of faith among all the Gentiles for His name's sake,",
            ...
        ]
    }
}
```
