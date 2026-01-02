#!/usr/bin/env python3
import os
import sys
from datetime import datetime
from slugify import slugify
import argparse
import subprocess

def create_new_post(title_parts):
    title = " ".join(title_parts)
    date = datetime.now().strftime('%Y-%m-%d')

    for lang in ["it", "en"]:
        filename = f"_posts/{lang}/{date}-{slugify(title)}.md"

        if os.path.exists(filename):
            print(f"{filename} already exists!")
            sys.exit(1)

        print(f"Creating new post: {filename}")
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, 'w', encoding='utf-8') as post:
            post.write("---\n")
            post.write(f'title: {title.replace("&", "&amp;")}\n')
            post.write("categories: news\n")
            post.write(f'permalink: /{slugify(title)}\n')
            post.write(f"lang: {lang}\n")
            post.write(f"description: <FILL ME!!!>\n")
            post.write(f"keywords: <FILL ME!!!>\n")
            post.write(f'page_id: {slugify(title)}\n')
            post.write("header:\n")
            post.write("    teaser: FILL ME!\n")
            post.write("classes: wide\n")
            post.write("---\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a new Jekyll post")
    parser.add_argument("title", nargs="+", help="Title of the post. The date will be set to today automatically.")
    args = parser.parse_args()

    create_new_post(args.title)