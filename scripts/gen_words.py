# Word timings for any script (incl. Devanagari): spread each line's words over the exact line time, weighted by length.
import json, sys, pathlib, re
P = pathlib.Path(sys.argv[1]); d = json.loads((P / 'data/lines.json').read_text()); out = []
for ln in d['lines']:
    ws = ln['text'].split(); wt = [max(2, len(re.sub(r'\W', '', w))) + 1 for w in ws]; tot = sum(wt); t = ln['start']; span = ln['end'] - ln['start']
    for w, k in zip(ws, wt):
        e = t + span * k / tot; out.append({'w': w, 'line': ln['i'], 's': round(t, 3), 'e': round(e - 0.03, 3)}); t = e
(P / 'data/words.json').write_text(json.dumps(out, ensure_ascii=False, indent=1))
(P / 'data/words.txt').write_text('\n'.join(f"{o['s']:7.2f} {o['e']:7.2f}  L{o['line']}  {o['w']}" for o in out))
print(len(out), 'words ->', P / 'data/words.json')
