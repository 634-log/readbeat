from flask import Flask, render_template
import os, json

app = Flask(__name__)

# 本の一覧ページ
@app.route("/")
def index():
    books = []
    data_dir = os.path.join("static", "data")
    for filename in os.listdir(data_dir):
        if filename.endswith(".json"):
            path = os.path.join(data_dir, filename)
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
                books.append({
                    "file": filename,
                    "title": data.get("title", filename),
                    "author": data.get("author", "不明")
                })
    return render_template("index.html", books=books)

# 選んだ本を読むページ
@app.route("/read/<filename>")
def read(filename):
    return render_template("reader.html", filename=filename)

if __name__ == "__main__":
    app.run(debug=True)
