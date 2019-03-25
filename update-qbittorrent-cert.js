#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const lineagePath = '/etc/letsencrypt/live/corygross.io';

const certPath = path.join(lineagePath, 'fullchain.pem');
const keyPath = path.join(lineagePath, 'privkey.pem');

const globalNewlines = /\n/g;
const escapedNewline = '\\n';

const qbtConfigPath = path.join(process.env.HOME, '.config/qBittorrent/qBittorrent.conf');

const qbtConfigCertRegex = /(WebUI\\HTTPS\\Certificate=\"\@ByteArray\()(.*)(\n\")/;
const qbtConfigKeyRegex = /(WebUI\\HTTPS\\Key=\"\@ByteArray\()(.*)(\n\")/;

const opt = { encoding: 'utf8' };

const qbtConfigPromise = readFile(qbtConfigPath, opt);

Promise.all([
  readFile(certPath, opt),
  readFile(keyPath, opt),
  readFile(qbtConfigPath, opt)
]).then((results) => {
  const [certText, keyText, qbtConfigText] = results;

  const escapedCert = certText.replace(globalNewlines, escapedNewline);
  const escapedKey = keyText.replace(globalNewlines, escapedNewline);

  const newConfig = qbtConfigText
    .replace(qbtConfigCertRegex, `$1${escapedCert}$3`)
    .replace(qbtConfigKeyRegex, `$1${escapedKey}$3`);

  return writeFile(qbtConfigPath, newConfig, opt);
}).then(() => {
  console.log('update.js ran successfully');
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
