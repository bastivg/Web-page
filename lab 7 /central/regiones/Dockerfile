FROM golang:latest

WORKDIR /code

RUN apt-get update
RUN apt-get install python3 python3-pip -y
RUN apt-get install -y protobuf-compiler


#COPY ./ ./code
COPY ./ .





#RUN apt-get install -y golang
#RUN pip3 install -r /requirements.txt
# Compila la aplicación Go
#RUN go build -o myapp
#RUN apt-get install -y protobuf-compiler grpc-tools

# Copia los archivos de tu aplicación al contenedor


#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]




# Expon el puerto en el que la aplicación escuchará
#EXPOSE 8080

# Ejecuta la aplicación Go
#CMD ["./myapp"]