package main

import (
	"bufio"
	"containerized-go-app/proto"
	"context"
	"fmt"
	"log"
	"math"
	"math/rand"
	"net"
	"os"
	"strconv"
	"strings"

	"google.golang.org/grpc"
)

// Variable para determinar los interesados restantes
var personas int

type server struct {
	proto.UnimplementedKeyServiceServer
}

func (s *server) SendKey(ctx context.Context, in *proto.KeyRequest) (*proto.KeyResponse, error) {
	if in.GetTipo() == 1 { // Si el valor de Tipo == 1 corresponde a una notificación de llaves, sino va para los usuarios que obtuvieron llaves
		log.Printf("Llaves Recibidas: %v", in.GetKey())
		personas = LecturaArchivoInicio()
		fmt.Printf("Hay %d personas interesadas en acceder a la beta.\n", personas)
		// Agregar mensaje a la cola Rabbit
	} else {
		personas = personas - int(in.GetKey())
		fmt.Printf("Se inscribieron %d personas\n", in.GetKey())
		fmt.Printf("Quedan %d peronas en espera de cupo\n", personas)
		/* Aca implementar logica de enviar mensaje a la cola rabbit en caso de que falten cupos
		if personas != 0 {
			log.Println("Todos recibieron Llaves")
		} else {
			log.Println("Aun faltan mas llaves para completar la cuota")
		}*/
	}
	return &proto.KeyResponse{Message: "Asia"}, nil // Cambiar el mensaje por el nombre del servidor
}

func main() {

	// Creacion del servidor, editar el segundo valor con la ip y puerto a usar
	lis, err := net.Listen("tcp", ":5051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	proto.RegisterKeyServiceServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

// Funciones Utiles

func LecturaArchivoInicio() int {
	// Empieza la Generación de Archivos
	file, err := os.Open("./regiones/parametros_de_inicio.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	interesados := 0

	for scanner.Scan() {
		//fmt.Println(scanner.Text())
		linea := scanner.Text()          // lee una linea del archivo txt
		linea = strings.TrimSpace(linea) // elimina espacios en el archivo txt

		numero, err := strconv.ParseFloat(linea, 64)
		if err != nil {
			fmt.Println("Error al convertir números en línea: ", linea)
			continue
		}
		valor_sup := numero / 2.0
		valor_sup = valor_sup - (valor_sup * (20.0 / 100.0))
		valor_inf := numero / 2.0
		valor_inf = valor_inf - (valor_inf * (20.0 / 100.0))
		valor_sup = math.Round(valor_sup)
		valor_inf = math.Round(valor_inf)
		interesados = rand.Intn(int(valor_sup)-int(valor_inf)+1) + int(valor_inf)
	}
	return interesados

}
