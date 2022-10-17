# A resume generator.

a preview address: [about me](https://starxx.me/resume)

## USAGE
before start, you should: 

- config your own resume
```bash
cp config/resume.example.toml config/resume.toml
```

- ~~config your own avatar~~(**deprecation**):
```bash
cp <your own avatar image> config/avatar.jpg
```


then:

```bash
# install dependencies
yarn install

# run a local server to preview the resume
yarn dev
```

You can edit [`resume.toml`](config/resume.example.toml) config file to generate custom content.

# FEATURE
From the page, you can:
- [x] Custom your own avatar
- [ ] Custom content directly
- [ ] Preview content
- [x] Export a `.pdf` resume file

## NOTE
For using puppeteer, you will require the following Dependencies:
```bash
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
for more detail you can check this [issue](https://github.com/puppeteer/puppeteer/issues/3443#issuecomment-433096772)
