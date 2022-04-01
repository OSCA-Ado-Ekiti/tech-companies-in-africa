# %%
import re
import json
import os

# %%
filename = 'README copy.md'
file = open(filename, 'r')
text = file.read()
file.close()

# %%
text = text.split('*')[1:]

# %%
texts = []

for t in text:
    texts.append(t.strip())

# %%
comp_regex = r"\[(.*?)\]\((.*?)?\)"
founders_regex = r"\[(.*?)\]"
industry_regex = r"Industr(y|ies)\s?: (.+)"

founders_at_regex = r"(@\w+)\]"
founder_link_rx = r"\((.*?)\)"

# %%
json_data = {}

for t in texts:
    # data = {}
    # print(t)
    lines = [l.strip() for l in t.split("\n") if len(l.strip()) > 0]
    comp = re.search(comp_regex, lines[0])
    # print(lines)
    founders = re.findall(founders_regex, lines[1])
    f_links = re.findall(founder_link_rx, lines[1])
    industry = re.search(industry_regex, lines[2])

    company = comp.groups()[0]
    # founding = {"name": f"{founders[0]}", "link": f""}
    founding = [{
        "name": f"{founders[i]}",
        "link": f"{f_links[i]}",
    } for i in range(len(founders))]
    website = comp.groups()[1]
    industry = industry.groups()[1]

    data = {
        "Company": f"@{company}",
        "Founders": founding,
        "Industry": industry,
        "Website": website
    }

    # print("Company:", company, ', Website:', website)
    # print("Founders:", founding)
    # print("Industry:", industry)
    # print(data)
    json_data[company] = data

# %%
encoder = json.encoder.JSONEncoder()
bigData = encoder.encode(json_data)

# dataFile = op
if not os.path.exists('./update/'):
    os.mkdir('./update')

with open('./update/techCompanies.json', 'w') as dataFile:
    dataFile.write(bigData)
