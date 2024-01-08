const filter = require("replacefilter")

filter.
filter.filterReplacingCharacters("Привет мир") // {status: false, text: "response"}
filter.filterReplacingCharacters("Пruвeт мur") // {status: true, text:"response"}