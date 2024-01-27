import utils
from utils import load_model_tokenizer, get_top_n_unique_scores, average_pool, split_chunks_without_tag
from utils import generate_embeds_single_unit, create_database, update_database, get_results
import atexit

from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import os
import json

from pyngrok import ngrok

ngrok.set_auth_token("2bUFREgQYhyUi2FQRJWIUFloFU3_6oFZD6KqkFFeLCM6rW91r")
public_url = ngrok.connect(5000).public_url
print(f"PUBLIC URL :{public_url}")


def exit_handler():
  print("Flask app is exiting. Stopping ngrok.")
  ngrok.kill()


atexit.register(exit_handler)

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# FOR local use ( Needs the model downloaded!) model,tokenizer=load_model_tokenizer(script_dir+"/gte-small")
model, tokenizer = load_model_tokenizer("Supabase/gte-small")

app = Flask(__name__)


@app.route('/')
def home():
  print("I am alive!!", datetime.now())
  return "I am alive!!"


@app.route('/process_json', methods=['POST'])
def process_json():
  try:

    input_json = request.get_json()
    input_file_path = 'cache/input.json'
    with open(input_file_path, 'w') as json_file:
      json.dump(input_json, json_file, indent=2)

    get_results("cache/input.json", "cache/results.json",
                "vector-db/Uni_Database.pth", model, tokenizer)

    # Read and send back the results.json
    with open('cache/results.json', 'r') as json_file:
      results_json = json.load(json_file)

    # Delete input.json and results.json
    os.remove(input_file_path)
    os.remove('cache/results.json')

    return jsonify(results_json)

  except Exception as e:
    print(f"Error processing JSON: {e}")
    return jsonify({"error": "Failed to process JSON"}), 500


@app.route('/update_json', methods=['POST'])
def update_json():
  try:
    # Get the JSON data from the request
    data = request.get_json()

    # Save the JSON data to cache/update.json
    with open('cache/update.json', 'w') as json_file:
      json.dump(data, json_file, indent=2)

    update_database("cache/update.json", "vector-db/Uni_Database.pth", model,
                    tokenizer)

    os.remove('cache/update.json')

    # Return a success message
    return jsonify({"message": "Database updated"})

  except Exception as e:
    # Handle exceptions if any
    return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
  # Schedule a periodic task to print "I am alive!!" every 1 minute
  import threading

  def print_alive():
    print(f"I am alive!! on {public_url}", datetime.now())
    threading.Timer(60, print_alive).start()

  threading.Timer(60, print_alive).start()

  # Run the Flask app
  app.run(port=5000)
