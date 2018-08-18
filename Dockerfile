FROM thera:latest

RUN apt-get update
RUN apt-get -y upgrade

# Pandoc, PlantUML, GraphViz
RUN apt-get install -y\
  pandoc python-pip plantuml graphviz\
  libgraphviz-dev graphviz-dev pkg-config
RUN pip install pandocfilters pygraphviz

ARG cache-18-08-18
# Pandoc filters: plantuml, graphviz (under `pandocfilters`) and include-code
WORKDIR /pandoc-filters
RUN git clone https://github.com/anatoliykmetyuk/pandocfilters.git
RUN git clone https://github.com/anatoliykmetyuk/include-code.git