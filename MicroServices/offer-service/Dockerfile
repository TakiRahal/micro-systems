# Étape 1 : Build l’application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Étape 2 : Créer une image légère
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/offer-service-*.jar app.jar
EXPOSE 8083

# Set Spring profile to docker
ENV SPRING_PROFILES_ACTIVE=docker

ENTRYPOINT ["java", "-jar", "app.jar"]
