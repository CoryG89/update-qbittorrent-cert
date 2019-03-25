# update-qbittorrent-cert

## Install

### Let's Encrypt

If you are using letsencrypt, then running the following will copy the
script to `/etc/letsencrypt/renewal-hooks/deploy/update-qbittorrent-cert.js` where a default letsencrypt installation will pick up the script and run it on a successful renewal.

```sh
$ git clone https://github.com/CoryG89/update-qbittorrent-cert.git
$ npm run install-letsencrypt
```

### Custom

If you have a custom letsencrypt directory, or you would like to copy the script to a different location use the following.

```sh
$ git clone https://github.com/CoryG89/update-qbittorrent-cert.git
$ npm run install-script path/to/dest
```
