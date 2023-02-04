# egg

The source code for the official website of the student conference organized by
the gynecology student association at Warsaw Medical University.

## Prerequisites

`Node.js` in version 18.x (LTS) is recommended. You can download it here:
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

## About

The front-end is a client-side rendered React app. POST and GET requests are
handled by PHP.

This is indeed a weird way to design a website, but I wanted to use React as it
significantly shortens development time and I find it easier to build visually
pleasing interfaces with it. The problem is that React uses client-side
rendering which makes it difficult to interact with server files (the `public`
directory). Using PHP instead of something like nodejs allows us to use cheap
website hosting services instead of more costly vistual servers that would allow
us to use the latter.

## Project structure

Included files:

- `src/` - frontend, the client-side rendered React app
- `public/locales` - contains translations for strings (PL/EN)
- `public/static/images` - static assets
- `public/php` - backend PHP scripts

Not included (placed on server):

- `public/static/organisers` - info about organisers, json format:

```json
{
  "position": 2,
  "name": "Jan Kowalski",
  "description": "Lorem ipsum dolor sit amet, consectetur..",
  "picture": "1.jpeg"
}
```

- `public/static/speakers` - same as organisers
- `public/static/gallery` - photos (organised in folders) to be shown in
  the photo gallery tab
- `public/static/news`
- `public/static/sponsors`
