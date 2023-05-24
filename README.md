
# Generate taproot address from seed phrase
  A JS project with simple UI that takes user provided 12 words seed phrase and generate taproot address, Public key hex and WIP key with an option to download WIP file.


## Technologies in use

- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) - Provides a p2tr function to generate p2tr address, output
- [bip32](https://github.com/bitcoinjs/bip32) - Derives private and public keys of a wallet from a binary master seed
- [@bitcoinerlab/secp256k1](https://github.com/bitcoinerlab/secp256k1) - For performing elliptic curve operations on the secp256k1 curve
- [safe-buffer](https://github.com/feross/safe-buffer) - Safer Buffer API
- [WIF](https://github.com/bitcoinjs/wif) - Wallet import format that supports PK encoding and decoding
- [browserify](https://browserify.org/) - allows to use Node.js modules directly in the browser. 
- [Tailwind CSS](https://tailwindcss.com/) - For styling


## Working with this project

1. Clone this repository

2. Serve the index.html file from here

   `npx serve`

That's it, you are all set!



## Project Structure

Breaking down the basic structure and the configurations

```bash
├── app.js               # core logic
├── index.html           # entrypoint for libs and app.js
├── lib                  # browserifyed libraries
│   ├── bip32.js
│   ├── bip39.js
│   ├── bitcoinjs-lib.js
│   ├── ecpair.js
│   ├── safe-buffer.js
│   ├── secp256k1.js
│   └── wif.js
├── package-lock.json
├── package.json
└── styles.css
```

*** 


