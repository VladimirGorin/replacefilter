#### Caution! This code is currently designed to function exclusively with Russian characters; therefore, the instructions provided will be in Russian. Support for replacing English characters will be implemented in future updates.

> Для запуска требуется [Node.js](https://nodejs.org/) v18+.
## Установка

```bash
npm i replacefilter
```

## Примеры

```javascript
const filter = require("replacefilter")

filter.filterReplacingCharacters("Привет мир") // {status: false, text: "response"}
filter.filterReplacingCharacters("Пruвeт мur") // {status: true, text:"response"}

```


## License

MIT