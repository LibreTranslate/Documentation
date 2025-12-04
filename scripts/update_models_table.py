#!/usr/bin/env python
import requests
import json
import os

response = requests.get('https://raw.githubusercontent.com/argosopentech/argospm-index/main/index.json')
models = response.json()
doc = os.path.join(os.path.dirname(__file__), "..", "src", "content", "docs", "guides", "supported_languages.md")


with open(doc, "w", encoding="utf-8") as f:
    f.write("""
---
title: Supported Languages
description: List of available language models.
---

LibreTranslate language models are hosted on the [argospm-index](https://github.com/argosopentech/argospm-index). For additional models (not included in this list) also check [this thread](https://community.libretranslate.com/t/opus-mt-language-models-port-thread/757).

If a direct language pair is not available, the program automatically pivots (usually via English).

| From        | To        | Size (MB)    | Version | Link                                                              |
| ----------- | ----------| --------- | ------- | ----------------------------------------------------------------- |
""")

    for model in models:
        size_mb = 0
        print(f"{model['from_name']} --> {model['to_name']}")
        try:
            head_response = requests.head(model['links'][0])
            content_length = head_response.headers.get('content-length')
            if content_length and content_length.isdigit():
                size_mb = round(int(content_length) / (1024 * 1024))
            else:
                size_mb = "-"
        except:
            size_mb = "-"
        
        f.write(f"| {model['from_name']} ({model['from_code']}) | {model['to_name']} ({model['to_code']}) | {size_mb} | {model['package_version']} | [Link]({model['links'][0]}) |\n")
        

print(f"Wrote {doc}")
