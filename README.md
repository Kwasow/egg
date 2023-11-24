# egg

[![build](https://github.com/Kwasow/egg/actions/workflows/build.yml/badge.svg)](https://github.com/Kwasow/egg/actions/workflows/build.yml)
[![eslint](https://github.com/Kwasow/egg/actions/workflows/eslint.yml/badge.svg)](https://github.com/Kwasow/egg/actions/workflows/eslint.yml)
[![prettier](https://github.com/Kwasow/egg/actions/workflows/prettier.yml/badge.svg)](https://github.com/Kwasow/egg/actions/workflows/prettier.yml)

The source code for the official website of the student conference organized by
the gynecology student association at Warsaw Medical University.

## Prerequisites

`Node.js` in version 20.x (LTS) is recommended. You can download it here:
https://nodejs.org/

It is recommended to develop on Linux/macOS or the WSL.

You'll also need `php` installed for development, because php files are
preprocessed in development builds.

## Code style

If you're using vscode it is recommended to install the `eslint` plugin which
will enforce the code style set in `.eslintrc.json`

Code style rules include:

- indent using spaces (2)
- use single quotes for strings
- never use semicolons

## Running

To install all the dependencies run:

`yarn`

To run the project run:

`yarn start`

## Project structure

Included files:

- `src/` - frontend, the client-side rendered React app
- `public/locales` - contains translations for strings (PL/EN)
- `public/static/images` - static assets
- `public/static/program` - the conference program
- `public/static/documents` - important documents
- `public/static/sponsors` - sponsors' logos
- `public/php` - backend PHP scripts

Not included (placed on server):

- `public/static/experts` - info about experts, json format:

```json
{
  "position": 2,
  "name": "Jan Kowalski",
  "description_pl": ["Lorem ipsum dolor sit amet, consectetur.."],
  "description_en": ["Lorem ipsum dolor sit amet, consectetur.."],
  "picture": "1.jpeg"
}
```

- `public/static/speakers` - same as experts
- `public/static/gallery` - photos (organised in folders) to be shown in
  the photo gallery tab
- `public/static/news` - news presented on the main page
