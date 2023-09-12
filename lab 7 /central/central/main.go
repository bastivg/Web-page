package main

import (
	"bufio"
	"containerized-go-app/proto"
	"context"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"

	"google.golang.org/grpc"
)

// Creación del registro
var path = "/central/registro.txt"


func main() {

	// Crear la cola Rabbit

	// Verificar si existe el archivo registro.txt
	_, err := os.Stat(path)
	if err != nil {
		if os.IsNotExist(err) {
			crearArchivo()
			fmt.Printf("El archivo %s no existe. \n", path)
		} else {
			fmt.Printf("Error al verificar el archivo: %v\n", err)
		}
	}

	// Lectura del archivo de parametros
	key, iterar := LecturaArchivoInicio()
	i := 1
	if iterar == -1 {
		fmt.Printf("Generación %d/infinito\n", i)
	} else {
		fmt.Printf("Generación %d/%d\n", i, iterar)
	}

	// Conexión con un servidor Regional X
	conn, err := grpc.Dial("regiones:50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("No se pudo conectar: %v", err)
	}
	defer conn.Close()
	c := proto.NewKeyServiceClient(conn)

	// Envio de llaves (Esto es un ejemplo)
	r, err := c.SendKey(context.Background(), &proto.KeyRequest{Key: key, Tipo: 1})
	if err != nil {
		log.Fatalf("No se pudo enviar las llaves: %v", err)
	}
	log.Printf("Llaves recibidas en el servidor de %s", r.GetMessage())

	// Envio de Usuarios Inscritos (Esto es un ejemplo)
	r2, err := c.SendKey(context.Background(), &proto.KeyRequest{Key: 50, Tipo: 2})
	if err != nil {
		log.Fatalf("No se pudo enviar las llaves: %v", err)
	}
	log.Printf("Se inscribieron %d cupos de servidor %s", 50, r2.GetMessage())
}

// Funciones Utiles
func crearArchivo() {
	var _, err = os.Stat(path)

	if os.IsNotExist(err) {
		var file, err = os.Create(path)
		if existeError(err) {
			return
		}
		defer file.Close()
	}

	fmt.Println("Archivo creado exitosamente", path)
}

func escribeArchivoRegistro(valor int) {
	hora := time.Now()
	horaformateada := hora.Format("15:04")
	var file, err = os.OpenFile(path, os.O_RDWR, 0644)
	if existeError(err) {
		return
	}
	defer file.Close()

	_, err = file.WriteString(fmt.Sprintf("%s - %d \n", horaformateada, valor))
	if existeError(err) {
		return
	}

	err = file.Sync()
	if existeError(err) {
		return
	}

	fmt.Println("Archivo registro actualizado correctamente.")
}

func existeError(err error) bool {
	if err != nil {
		fmt.Println(err.Error())
	}

	return (err != nil)
}

func LecturaArchivoInicio() (int32, int) {
	file, err := os.Open("./central/parametros_de_inicio.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	llaves := 0
	iteraciones := 0
	aux := 0

	for scanner.Scan() {
		linea := scanner.Text()          // lee una linea del archivo txt
		linea = strings.TrimSpace(linea) // elimina espacios en el archivo txt

		partes := strings.Split(linea, "-") // Divide la linea en partes usando el "-" de separador
		if len(partes) == 2 && aux == 0 {   // La idea es utilizar esto para determinar la cantidad de llaves a generar
			numero1, err1 := strconv.Atoi(partes[0])
			numero2, err2 := strconv.Atoi(partes[1])
			if err1 != nil || err2 != nil {
				fmt.Println("Error al convertir números en línea: ", linea)
				continue
			}
			llaves = rand.Intn(numero2-numero1+1) + numero1
			escribeArchivoRegistro(llaves)
		} else {
			numero, err := strconv.Atoi(linea)
			if err != nil {
				fmt.Println("Error al convertir números en línea: ", linea)
				continue
			}
			iteraciones = numero
		}
		aux = aux + 1
	}
	return int32(llaves), iteraciones

}
