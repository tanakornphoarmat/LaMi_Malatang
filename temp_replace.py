import os
files = [r'D:\mala\index.html', r'D:\mala\menu\index.html', r'D:\mala\assets\js\i18n.js']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = content.replace('30+', '60')
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
