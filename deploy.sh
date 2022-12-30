#!/bin/sh

quasar build

scp -r dist/spa/* CyberServer:/home/c605index
