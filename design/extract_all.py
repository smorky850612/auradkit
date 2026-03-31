import re, json, sys

with open('C:/Users/smork/Desktop/woody_bundle.js', 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Find const Ro=[...] - the main data array
start_idx = content.find('const Ro=[{slug:')
if start_idx == -1:
    print("ERROR: Ro not found")
    sys.exit(1)

print(f"Found Ro at index: {start_idx}")

# Find the matching closing bracket
depth = 0
in_string = False
string_char = None
i = start_idx + len('const Ro=')
array_start = i
prev_char = ''

for j in range(i, min(i + 500000, len(content))):
    c = content[j]
    if in_string:
        if c == string_char and prev_char != '\\':
            in_string = False
    else:
        if c in ('"', "'", '`'):
            in_string = True
            string_char = c
        elif c in ('[', '{'):
            depth += 1
        elif c in (']', '}'):
            depth -= 1
            if depth == 0:
                array_end = j + 1
                break
    prev_char = c

raw = content[array_start:array_end]
print(f"Raw array length: {len(raw)}")

# Add quotes around unquoted keys
def fix_js_obj(s):
    s = re.sub(r'([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)', r'\1"\2"\3', s)
    return s

fixed = fix_js_obj(raw)

try:
    data = json.loads(fixed)
    print(f"Parsed successfully: {len(data)} terms")
    with open('C:/Users/smork/Desktop/woody_all_data.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, ensure_ascii=False, indent=2)
    print("Saved to woody_all_data.json")
    for d in data:
        print(f"  - {d.get('slug', '?')} | {d.get('term', '?')} | {d.get('category', '?')}")
except Exception as e:
    print(f"Parse error: {e}")
    print("First 500 chars of fixed:")
    print(fixed[:500])
