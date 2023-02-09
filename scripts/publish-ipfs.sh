npm run build
cid=$(deno run -A https://raw.githubusercontent.com/gera2ld/deno-lib/main/lib/ipfs/cli.ts uploadDir dist --name js-lib)
deno run -A https://raw.githubusercontent.com/gera2ld/deno-lib/main/lib/ipfs/dns-link/cli.ts cloudflare /ipfs/$cid gerald.win lib
