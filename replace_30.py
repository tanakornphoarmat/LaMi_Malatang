import os
import glob

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    content = content.replace('30+', '60+')
    content = content.replace('data-count="30"', 'data-count="60"')
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    root_dir = r'D:\mala'
    extensions = ['*.html', '*.js', '*.md']
    for ext in extensions:
        # Use recursive globbing
        for filepath in glob.glob(os.path.join(root_dir, '**', ext), recursive=True):
            # Skip node_modules or similar if any, although unlikely here
            if 'node_modules' in filepath or '.git' in filepath:
                continue
            process_file(filepath)

if __name__ == '__main__':
    main()
