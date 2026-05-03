import csv
import json

def convertir_a_json(archivo_entrada, archivo_salida):
    datos_json = []

    try:
        with open(archivo_entrada, encoding='utf-8') as f:
            # Leemos el archivo usando DictReader para usar las cabeceras como llaves
            lector_csv = csv.DictReader(f)
            
            for fila in lector_csv:
                # Construimos la estructura exacta que pediste
                item = {
                    "Cancion": {"S": fila["Cancion"]},
                    "Autor": {"S": fila["Autor"]},
                    "Año": {"N": int(fila["Año"])},
                    "Genero": {"S": fila["Genero"]},
                    "Album": {"S": fila["Album"]},
                }
                datos_json.append(item)

        # Guardamos el resultado en un archivo .json
        with open(archivo_salida, 'w', encoding='utf-8') as f_json:
            json.dump(datos_json, f_json, indent=4, ensure_ascii=False)
            
        print(f"¡Éxito! Se ha creado el archivo: {archivo_salida}")

    except FileNotFoundError:
        print("Error: No se encontró el archivo de texto. Asegúrate de que el nombre sea correcto.")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

# Ejecución del programa
if __name__ == "__main__":
    # Cambia 'datos.txt' por el nombre real de tu archivo
    convertir_a_json('Datos.txt', 'Base_de_datos.json')