Tokenizer node

Run with `node index [PORT]` 
PORT(number) is optional.

Counts number of tokens in messages and stores those into DB.

Sample configuration file: 

```
{
  "PORT": 3004,
  "MASTER_URI": "http://localhost:3002",
  "db": {
    "host": "127.0.0.1",
    "user": "postgres",
    "port": "5432",
    "database": "messages",
    "password": "1111"
  }
}
```

"PORT" is default tokenizer port, whet it is started with command `node index <PORT>` the port passed as argument is used.

"MASTER_URI" is URI of master server.
