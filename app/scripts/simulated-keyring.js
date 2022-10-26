import { EventEmitter } from 'events';

const type = 'Simulated key';

class SimulatedKeyring extends EventEmitter {
  constructor(opts) {
    super();
    this.type = type;
    this._wallets = [];
    this.deserialize(opts);
  }

  async serialize() {
    return this._wallets.map(({ publicKey }) => publicKey);
  }

  async deserialize(publicKeys = []) {
    this._wallets = publicKeys.map((publicKey) => {
      return { publicKey };
    });
  }

  async addAccounts() {
    throw new Error('Cannot add new account');
  }

  async getAccounts() {
    return this._wallets.map(({ publicKey }) => publicKey);
  }

  // tx is an instance of the ethereumjs-transaction class.
  async signTransaction(_opts = {}) {
    throw new Error('Cannot sign transaction with simulated keyring');
  }

  // For eth_sign, we need to sign arbitrary data:
  async signMessage(opts = {}) {
    throw new Error('Cannot sign message with simulated keyring');
  }

  // For personal_sign, we need to prefix the message:
  async signPersonalMessage(address, msgHex, opts = {}) {
    throw new Error('Cannot sign personal message with simulated keyring');
  }

  // For eth_decryptMessage:
  async decryptMessage(withAccount, encryptedData) {
    throw new Error('Cannot decrypt message with simulated keyring');
  }

  // personal_signTypedData, signs data along with the schema
  async signTypedData(
    withAccount,
    typedData,
    opts = { version: SignTypedDataVersion.V1 },
  ) {
    throw new Error('Cannot sign typed data with simulated keyring');
  }

  // get public key for nacl
  async getEncryptionPublicKey(withAccount, opts = {}) {
    throw new Error('Cannot get public key');
  }

  _getPrivateKeyFor(address, opts = {}) {
    throw new Error('Cannot get private key');
  }

  // returns an address specific to an app
  async getAppKeyAddress(address, origin) {
    return address;
  }

  // exportAccount should return a hex-encoded private key:
  async exportAccount(address, opts = {}) {
    throw new Error('Cannot export simulated account');
  }

  removeAccount(address) {
    this._wallets = this._wallets.filter(
      (wallet) => wallet.publicKey.toLowerCase() !== address.toLowerCase(),
    );
  }
}

SimulatedKeyring.type = type;
export default SimulatedKeyring;
