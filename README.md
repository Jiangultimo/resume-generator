# A resume generator.

## USAGE
```bash
# install dependencies
yarn install

# run a local server to preview the resume
yarn dev
```

```bash
# config your own resume
cp config/resume.example.toml config/resume.toml

# config your own avatar
cp <your own avatar image> config/avatar.jpg
```
You can edit [`resume.toml`](config/resume.example.toml) config file to generate custom content.

Then you can export a `.pdf` file with the button on the page (it's built with [puppeteer](https://pptr.dev), you can view the detail through [uitls/pdf.ts](utils/pdf.ts)).
