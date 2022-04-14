# Requests with Axios and Tor on Nodejs

## Requirements

Requirements from: [tor-request](https://www.npmjs.com/package/tor-request)

A Tor client.

It's highly recommended you run the official client yourself, either locally or otherwise. Tor is available for most systems often just a quick one-line install away.

On **Debian**/**Ubuntu** you can install and run a relatively up to date Tor with.

```bash
apt install tor # should auto run as daemon after install
```

**Misc Linux Command for running Tor as daemon**
`--RunAsDaemon 1`
**thanks @knoxcard**

```
/usr/bin/tor --RunAsDaemon 1
```

On **OSX** you can install with homebrew

```bash
brew install tor
tor # run tor
```

If you'd like to run it as a background process you can add `&` at the end of the command `tor &`. I like to have it running on a separate terminal window/tab/tmux/screen during development in order to see what's going on.

On **Windows** download the tor expert bundle (not the browser), unzip it and run `tor.exe` inside the Tor/ directory.

download link: [Windows Expert Bundle](https://www.torproject.org/download/tor/)

```bash
./Tor/tor.exe # --default-torrc PATH_TO_TORRC
```

See [TorProject.org](https://www.torproject.org/docs/debian.html.en) for detailed installation guides for all platforms.

## Configuring Tor, enabling the ControlPort

You need to enable the Tor ControlPort if you want to programmatically refresh the Tor session (i.e., get a new proxy IP address) without restarting your Tor client.

Configure tor by editing the torrc file usually located at **/etc/tor/torrc**, **/lib/etc/tor/torrc**, **~/.torrc** or **/usr/local/etc/tor/torrc** - Alternatively you can supply the path yourself with the **--default-torrc PATH** command line argument. See [Tor Command-Line Options](https://www.torproject.org/docs/tor-manual.html.en)

Generate the hash password for the torrc file by running **tor --hash-password SECRETPASSWORD**.

```bash
tor --hash-password giraffe
```

The last line of the output contains the hash password that you copy paste into torrc

```bash
Jul 21 13:08:50.363 [notice] Tor v0.2.6.10 (git-58c51dc6087b0936) running on Darwin with Libevent 2.0.22-stable, OpenSSL 1.0.2h and Zlib 1.2.5.
Jul 21 13:08:50.363 [notice] Tor can't help you if you use it wrong! Learn how to be safe at https://www.torproject.org/download/download#warning
16:AEBC98A6777A318660659EC88648EF43EDACF4C20D564B20FF244E81DF
```

Copy the generated hash password and add it to your torrc file

```bash
# sample torrc file
ControlPort 9051
HashedControlPassword 16:AEBC98A6777A318660659EC88648EF43EDACF4C20D564B20FF244E81DF
```
