import json
import re
import numpy as np
import torch

import torch.nn.functional as F
from torch import Tensor
from transformers import AutoTokenizer, AutoModel


def load_model_tokenizer(path):
  device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
  print("Using device:", device)
  tokenizer = AutoTokenizer.from_pretrained(path)
  model = AutoModel.from_pretrained(path)

  return model, tokenizer


def get_top_n_unique_scores(scores_matrix, n):

  infered_results = []

  for i in range(n):
    max_value, flat_index = torch.max(scores_matrix.view(-1), 0)
    max_indices = [
        flat_index.item() // scores_matrix.size(1),
        flat_index.item() % scores_matrix.size(1)
    ]

    infered_results.append({float(max_value.item()): max_indices})

    scores_matrix[max_indices[0], :] = 0

  return infered_results


def average_pool(last_hidden_states: Tensor, attention_mask: Tensor) -> Tensor:
  last_hidden = last_hidden_states.masked_fill(
      ~attention_mask[..., None].bool(), 0.0)
  return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]


def split_chunks_without_tag(string, every_n_sentences=1):
  sentences = re.split(r"(?<=[.!?])\s+", string)
  sentences = [sentence.strip() for sentence in sentences if sentence.strip()]
  chunks = [
      ' '.join(sentences[i:i + every_n_sentences])
      for i in range(0, len(sentences), every_n_sentences)
  ]
  return chunks


def generate_embeds_single_unit(file_path, model, tokenizer, item_index=None):

  try:
    with open(file_path, 'r') as json_file:
      data = json.load(json_file)

      # If item_no is provided and exists in the data, use it
      if item_index is not None and 0 <= item_index < len(data):
        item_data = data[item_index]
      # If item_no is not provided or is out of range, use the first item
      else:
        item_data = data

  except Exception as e:
    print(f"Error reading JSON file: {e}")
    return None

  title_text = item_data.get("title", "")
  methodology_text = item_data.get("methodology", "")
  description_text = item_data.get("description", "")
  combined_text = f"{title_text}.\n\n{methodology_text}\n\n{description_text}"

  oid = item_data.get("_id", "")

  sentences = split_chunks_without_tag(combined_text)
  sentence_tensors = []
  for sentence in sentences:
    # Process each sentence separately
    batch_dict = tokenizer([sentence],
                           max_length=512,
                           padding=True,
                           truncation=True,
                           return_tensors='pt')
    outputs = model(**batch_dict)
    sentence_embedding = outputs.last_hidden_state.mean(dim=1)
    sentence_embedding = F.normalize(sentence_embedding, p=2, dim=1)
    sentence_tensors.append(sentence_embedding)

  embeddings = torch.cat(sentence_tensors, dim=0)

  return sentences, embeddings, oid


def create_database(json_path, save_path, model, tokenizer, start, end):
  database = [[], [], []]

  for i in range(start, end):
    sentences, embeds, id = generate_embeds_single_unit(json_path,
                                                        model,
                                                        tokenizer,
                                                        item_index=i)
    database[0].append(sentences)
    database[1].append(embeds)
    database[2].append(id)

  torch.save(database, save_path)
  print("Database Saved!")


def update_database(input_json, database_location, model, tokenizer):
  data = torch.load(database_location)
  input_sentences, input_embeds, oid = generate_embeds_single_unit(
      input_json, model, tokenizer)
  data[0].append(input_sentences)
  data[1].append(input_embeds)
  data[2].append(oid)

  torch.save(data, database_location)
  print("Database Updated!")


def get_results(input_json, output_json, database_location, model, tokenizer):

  input_sentences, input_embeds, input_oid = generate_embeds_single_unit(
      input_json, model, tokenizer)
  data = torch.load(database_location)

  scores = []
  for m in data[1]:
    scores.append((input_embeds @ m.T) * 100)

  final_results = []
  for i in scores:
    final_results.append(get_top_n_unique_scores(i, 3))

  avg_of_keys = np.array([
      sum(key for d in sublist for key in d.keys())
      for sublist in final_results
  ]) / 3
  max_index = np.argmax(avg_of_keys)

  if avg_of_keys[max_index] > 91:

    if avg_of_keys[max_index] >= 100:
      display_score = 100
    else:
      display_score = avg_of_keys[max_index] - 30

    conclusion = final_results[max_index]

    plagarised_data = input_sentences
    subject_data = data[0][max_index]
    subject_oid = data[2][max_index]

    result_list = []

    for item in conclusion:
      for key, value in item.items():
        a, b = value  # Extract values for a and b
        result_list.append({
            "_id": subject_oid,
            "heading": f"{subject_data[0]}",
            "score": display_score,
            "plagarised_text": plagarised_data[a],
            "similar_text": subject_data[b]
        })

    with open(output_json, 'w') as json_file:
      json.dump(result_list, json_file, indent=2)

      print(f"JSON file '{output_json}' created successfully.")
  else:
    # Create a JSON file indicating no plagiarism
    no_plagiarism_data = {"score": "0"}

    with open(output_json, 'w') as json_file:
      json.dump(no_plagiarism_data, json_file, indent=2)

    print(f"JSON file '{output_json}' created successfully.")
