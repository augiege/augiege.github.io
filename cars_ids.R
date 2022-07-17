cars2017 <- read.csv("cars2017.csv")
cars2017$id <- seq.int(nrow(cars2017))
write.csv(cars2017, "cars2017_ids.csv")
