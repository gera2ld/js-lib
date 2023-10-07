#!/usr/bin/env bash

set -ex

DENO_LIB=https://raw.githubusercontent.com/gera2ld/deno-lib/main/lib
CID=$(deno run -A $DENO_LIB/ipfs/cli.ts upload --name js-lib dist)
deno run -A $DENO_LIB/ipfs/dns-link/cli.ts cloudflare /ipfs/$CID lib.gerald.win
