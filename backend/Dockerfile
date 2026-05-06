FROM openjdk:17

WORKDIR /app

COPY . .

RUN chmod +x gradlew && ./gradlew clean build

CMD ["java", "-jar", "build/libs/*.jar"]