FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x gradlew && ./gradlew clean build

CMD ["java", "-jar", "build/libs/*.jar"]