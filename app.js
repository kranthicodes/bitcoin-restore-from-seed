//Init
bitcoin.initEccLib(ecc);
const bip32Obj = bip32.BIP32Factory(ecc);

// UI Class
class UI {
  static displayResult(resultData) {
    const resultContainer = document.querySelector("#result-container");
    const taprootInputField = document.querySelector("#taproot-input");
    const pubKeyInputField = document.querySelector("#pubkey-input");
    const wifInputField = document.querySelector("#wif-input");

    taprootInputField.value = resultData.taprootAddress;
    pubKeyInputField.value = resultData.pubkeyHex;
    wifInputField.value = resultData.wifKey;

    resultContainer.classList.remove("hidden");
  }

  static validateSeedInput() {
    const seedPhraseInputField = document.querySelector("#seed-input");

    if (!seedPhraseInputField.value) {
      return false;
    }

    const seedArray = seedPhraseInputField.value.trim().split(" ");

    if (seedArray.length !== 12) {
      seedPhraseInputField.classList.add("invalid:border-pink-500");
      return false;
    }

    return seedArray.join(" ");
  }

  static setError(message) {
    const errorContainer = document.querySelector("#error-container");
    const errorTextEl = document.querySelector("#error-text");

    errorTextEl.textContent = message;
    errorContainer.classList.remove("hidden");
  }

  static resetError() {
    const errorContainer = document.querySelector("#error-container");
    const alreadyHidden = errorContainer.classList.contains("hidden");

    if (!alreadyHidden) {
      errorContainer.classList.add("hidden");
    }
  }
}

//Events

//Restore from Seed phrase
document
  .querySelector("#restore-btn")
  .addEventListener("click", handleRestoreFromSeed);

async function handleRestoreFromSeed() {
  UI.resetError();

  try {
    const validSeedPhrase = UI.validateSeedInput();

    if (!validSeedPhrase) {
      throw new Error("Please enter a valid seed phrase.");
    }

    const seed = await bip39.mnemonicToSeed(validSeedPhrase);
    const root = bip32Obj.fromSeed(seed, bitcoin.networks.bitcoin);
    const childNode = root.derivePath(`m/86'/0'/0'/0/0`);

    const publicKeyHex = childNode.publicKey.toString("hex");
    const privateKey = childNode.privateKey;
    const childNodeXOnlyPubkey = childNode.publicKey.slice(1, 33);

    const { address } = bitcoin.payments.p2tr({
      internalPubkey: childNodeXOnlyPubkey,
    });

    const wifKey = wif.encode(128, privateKey, true); //for testnet 0xEF, for mainnet 0x80

    const resultData = {
      taprootAddress: address,
      pubkeyHex: publicKeyHex,
      wifKey,
    };

    // Save WIF file
    document
      .querySelector("#export-btn")
      .addEventListener("click", () => downloadFile("wallet.wif", wifKey));

    UI.displayResult(resultData);
  } catch (error) {
    UI.setError(error.message);
  }
}

function downloadFile(filename, text) {
  const El = document.createElement("a");
  El.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  El.setAttribute("download", filename);

  El.style.display = "none";
  document.body.appendChild(El);

  El.click();

  document.body.removeChild(El);
}
