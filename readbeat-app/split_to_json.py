import re
import json
import os

# 文の分割ロジック
def text_to_sentences(text: str, max_len=50):
    text = text.replace("\n", "")
    # まず句点「。」で区切る
    raw_sentences = re.split(r'(?<=。)', text)
    raw_sentences = [s.strip() for s in raw_sentences if s.strip()]

    sentences = []
    for s in raw_sentences:
        if len(s) <= max_len:
            sentences.append(s)
        else:
            # 文が長い場合 → 読点「、」で分けられるか試す
            parts = re.split(r'、', s)
            current = ""
            for i, p in enumerate(parts):
                if current:
                    candidate = current + "、" + p
                else:
                    candidate = p
                if len(candidate) <= max_len:
                    current = candidate
                else:
                    # 30文字を超えたら確定
                    if current:
                        sentences.append(current + "、")
                    current = p
            if current:
                sentences.append(current)
    return sentences

# 1冊を変換
def convert_txt_to_json(txt_path: str, json_path: str, title="無題", author="不明"):
    with open(txt_path, "r", encoding="shift_jis") as f:  # 青空文庫はShift_JIS多い
        text = f.read()

    sentences = text_to_sentences(text)

    data = {
        "title": title,
        "author": author,
        "sentences": sentences
    }

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ {txt_path} → {json_path}")

# まとめて変換
if __name__ == "__main__":
    books_dir = "books"
    output_dir = "static/data"
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(books_dir):
        if filename.endswith(".txt"):
            txt_path = os.path.join(books_dir, filename)
            name = os.path.splitext(filename)[0]
            json_path = os.path.join(output_dir, f"{name}.json")

            convert_txt_to_json(
                txt_path=txt_path,
                json_path=json_path,
                title=name,
                author="不詳"
            )
