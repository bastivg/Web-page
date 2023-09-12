FROM golang:latest

WORKDIR /code

RUN apt-get update
RUN apt-get install python3 python3-pip -y
RUN apt-get install -y protobuf-compiler



COPY ./ .





#RUN apt-get install -y golang
# Compila la aplicación Go
#RUN go build -o myapp

# Copia los archivos de tu aplicación al contenedor

# Expon el puerto en el que la aplicación escuchará
#EXPOSE 8080

# Ejecuta la aplicación Go
#CMD ["./myapp"]