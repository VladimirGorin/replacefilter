const filter = require("replacefilter")

filter.filterReplacingCharacters()
filter.filterReplacingCharacters("Привет мир") // {status: false, text: "response"}
filter.filterReplacingCharacters("Пruвeт мur") // {status: true, text:"response"}