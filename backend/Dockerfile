FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x gradlew
RUN ./gradlew clean build --no-daemon -x test

CMD ["java", "-jar", "build/libs/production-management-0.0.1-SNAPSHOT.jar"]