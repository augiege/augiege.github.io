cars2017 <- read.csv("cars2017.csv")
cars2017$id <- seq.int(nrow(cars2017))
cars2017$avgMPG <- (cars2017$AverageCityMPG + cars2017$AverageHighwayMPG)/2
write.csv(cars2017, "cars2017_ids.csv")

asia <- c("Acura", "Genesis", "Honda", "Hyundai", "Infiniti", "Kia", "Lexus", "Mazda", "Mitsubishi",
          "Nissan", "Subaru", "Toyota")
europe <- c("Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Ferrari", "Fiat",
            "Jaguar", "Lamborghini", "Lotus", "Maserati", "McLaren Automotive", 
            "Mercedes-Benz", "MINI", "Porsche", "Rolls-Royce", "smart", "Volkswagen",
            "Volvo")
america <- c("Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC",
             "Jeep", "Land Rover", "Lincoln", "Ram", "Roush Performance", "Tesla")
mpg_by_make <- cars2017 %>%
  group_by(Make) %>% 
  summarise(mean_by_make = mean(avgMPG)) %>%
  mutate(Origin = ifelse((Make %in% asia), "Asia",
                         ifelse((Make %in% europe), "Europe",
                                ifelse((Make %in% america), "America", "Not"))))
write.csv(mpg_by_make, "mpg_by_make.csv")

count_by_make <- cars2017 %>%
  group_by(Make) %>% 
  summarise(n = n()) %>%
  # mutate(Origin = ifelse((Make %in% asia), "Asia",
  #                        ifelse((Make %in% europe), "Europe",
  #                               ifelse((Make %in% america), "America", "Not"))))
  mutate(parent = "Origin") %>%
  arrange(desc(nchar(Make)))

write.csv(count_by_make, "count_by_make.csv", row.names = F)

