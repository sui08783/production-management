FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x gradlew
RUN ./gradlew clean build --no-daemon

CMD ["java", "-jar", "build/libs/*.jar"]