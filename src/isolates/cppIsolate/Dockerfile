FROM gcc:latest

WORKDIR /exec

COPY code.cpp .
COPY input.txt .

RUN g++ -o code code.cpp

CMD ["timeout", "10s", "bash", "-c", "'ulimit -v 262144 && ./code < input.txt'"]
