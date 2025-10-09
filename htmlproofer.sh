#!/bin/bash

bundle exec htmlproofer \
  --disable-external \
  --ignore-missing-alt \
  --no-enforce-https \
  _site