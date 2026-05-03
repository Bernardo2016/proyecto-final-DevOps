import boto3
import json
from botocore.exceptions import ClientError

def cargar_canciones(archivo_json, nombre_tabla):
    # 1. Inicializar el recurso de DynamoDB
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1') # Cambia a tu región
    tabla = dynamodb.Table(nombre_tabla)

    try:
        # 2. Cargar el archivo JSON
        with open(archivo_json, 'r', encoding='utf-8') as f:
            canciones = json.load(f)

        # 3. Usar batch_writer para subir los datos de forma eficiente
        print(f"Iniciando la carga en la tabla '{nombre_tabla}'...")
        with tabla.batch_writer() as batch:
            for cancion in canciones:
                batch.put_item(Item=cancion)
        
        print(f"¡Éxito! Se han subido {len(canciones)} canciones correctamente.")

    except FileNotFoundError:
        print("Error: No se encontró el archivo JSON.")
    except ClientError as e:
        print(f"Error de AWS: {e.response['Error']['Message']}")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")

if __name__ == "__main__":
    # Asegúrate de que el nombre del archivo coincida con el tuyo
    cargar_canciones('base_de_datos_canciones.json', 'Canciones')