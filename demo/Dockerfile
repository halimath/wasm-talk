FROM node:22-bookworm-slim as FE_BUILDER

RUN apt-get update; \
    apt-get upgrade; \
    apt-get install -y git python3 make xz-utils

RUN git clone https://github.com/emscripten-core/emsdk.git; \
    cd emsdk; \
    ./emsdk install latest; \
    ./emsdk activate latest    

WORKDIR /src
COPY . .

WORKDIR /src/wasm
RUN make

WORKDIR /src
RUN npm i; npm run build

FROM golang:1.22-alpine as BE_BUILDER

WORKDIR /src

COPY --from=FE_BUILDER /src/dist ./dist
COPY server.go .

RUN go build -o server server.go

FROM scratch

COPY --from=BE_BUILDER /src/server /server
ENTRYPOINT [ "/server" ]